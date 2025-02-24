/* eslint-disable space-before-function-paren */
import { BaseController } from '../../libs/BaseController.js';
import { MeetingWithClientSchema } from './meetings.schema.js'
import { ClientModel } from '../clients/clients.model.js';
import { authorize, downloadFile, deleteFile, downloadFilesAndCompress } from '../../libs/services/googleApi.service.js';

import { ScheduleModel } from '../schedules/schedules.model.js';

export class MeetingController extends BaseController {
  createMeetingWithClient = async (req, res) => {
    const meetingWithClientSchema = new MeetingWithClientSchema;
    const validationResult = meetingWithClientSchema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ message: JSON.parse(validationResult.error.message) });
    }

    const validatedData = validationResult.data;
    const schedule = await ScheduleModel.getById({ id: validatedData.scheduleId })
    if (!schedule.date?.dataValues.isActive) {
      return res.status(400).json({ message: 'Date sent is not active' })
    }
    const client = await this.getOrCreateClient(validatedData);
    const someSchedule = await this.Model.getByFilter({ column: 'scheduleId', id: validatedData.scheduleId })
    if (someSchedule.status && someSchedule.result[0]?.dataValues.schedule.dataValues.scheduleCount > 0) {
      return res.status(401).json({ message: 'This time slot is already booked' });
    }
    const { status, result, message } = await this.Model.createNew({
      input: {
        scheduleId: validatedData.scheduleId,
        stateId: validatedData.stateId,
        clientId: client.idClient,
        serviceId: validatedData.serviceId,
        documentUrlMeeting: req.files ? JSON.stringify(req.ids) : '',
        descriptionMeeting: validatedData.descriptionMeeting ?? '',
      }
    });
    if (status) return res.status(201).json(result);
    res.status(500).json({ message: `Error on create method: ${message}` });

  };

  getByFilter = async (req, res) => {
    const column = Object.keys(req.query)[0];
    const id = req.query[column];
    const { status, result, message } = await this.Model.getByFilter({ column, id });
    if (status) return res.json(result);
    res.status(404).json({ message: `message: ${message}` });
  };

  getByClientFilter = async (req, res) => {
    const column = Object.keys(req.query)[0];
    const value = req.query[column];
    const { status, result, message } = await this.Model.getByClientFilter({ column, value });
    if (status) return res.json(result);
    res.status(404).json({ message: `message: ${message}` });
  }

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const byId = await this.Model.getById({ id });
      if (!byId.status) {
        return res.status(404).json({ message: `Object with id: ${id} not found` });
      }
      const { documentUrlMeeting } = byId.result;
      const { status, message } = await this.Model.delete({ id });
      if (!status) {
        return res.status(404).json({ message });
      }
      if (documentUrlMeeting) {
        const authClient = await authorize()
        await deleteFile(authClient, documentUrlMeeting);
      }

      return res.status(200).json({ message });

    } catch (error) {
      console.error(`Error in delete handler: ${error.message}`);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;

    try {
      const validationResult = this.Schema.validatePartial(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
      }

      let payload = validationResult.data;
      console.log(payload);
      if (req.file) {
        const byId = await this.Model.getById({ id });
        if (!byId.status) {
          return res.status(404).json({ message: `Object with id: ${id} not found` });
        }

        const { documentUrlMeeting } = byId.result;
        if (documentUrlMeeting && documentUrlMeeting !== req.file.path) {
          const fileResult = await deleteFile(documentUrlMeeting);
          if (!fileResult.success) {
            const errorMessage = fileResult.errorCode === 'ENOENT'
              ? 'File not found!'
              : 'Error deleting the file.';
            return res.status(fileResult.errorCode === 'ENOENT' ? 404 : 500).json({ message: errorMessage });
          }
        }

        payload = { ...payload, documentUrlMeeting: req.file.path };
      }
      const { status, result, message } = await this.Model.updateByPk({ id, input: payload });

      if (status) return res.status(200).json(result);
      if (message) return res.status(404).json({ message });

      return res.status(500).json({ message: `Error on update method: ${result}` });

    } catch (error) {
      console.error(`Error in update handler: ${error.message}`);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };


  getOrCreateClient = async (data) => {
    const { emailClient, nameClient, phoneNumberClient } = data;
    const resultGetByEmail = await ClientModel.getByEmail({ emailClient });

    if (resultGetByEmail.status) {
      return resultGetByEmail.result;
    }

    const resultCreate = await ClientModel.createNew({
      input: { nameClient, emailClient, phoneNumberClient },
    });

    return resultCreate.result;
  };

  getDocumentFromGoogleApi = async (req, res) => {
    const { id } = req.params;
    const { status, result, message } = await this.Model.getById({ id });
    if (!status) {
      return res.status(404).json({ message });
    }
    try {
      const authClient = await authorize();
      const { fileStream, fileName } = await downloadFile(authClient, result.dataValues.documentUrlMeeting);
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/octet-stream');
      fileStream.on('end', () => {
        res.end();
      });
      fileStream.pipe(res);
    } catch (error) {
      console.error(`Error in getDocumentFromGoogleApi handler: ${error.message}`);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
  getDocumentFromGoogleApiByCode = async (req, res) => {
    const { id, code } = req.query;
    const { status, result, message } = await this.Model.getById({ id });
    if (!status) {
      return res.status(404).json({ message });
    }
    let codeArray
    try {
      codeArray = JSON.parse(result.dataValues.documentUrlMeeting);
    } catch {
      codeArray = [result.dataValues.documentUrlMeeting];
    }
    if (!codeArray.includes(code)) {
      return res.status(404).json({ message: 'Code not found' });
    }
    try {
      const authClient = await authorize();
      const { fileStream, fileName } = await downloadFile(authClient, code);
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/octet-stream');
      fileStream.on('end', () => {
        res.end();
      });
      fileStream.pipe(res);
    } catch (error) {
      console.error(`Error in getDocumentFromGoogleApi handler: ${error.message}`);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  getDocumentsOnZip = async (req, res) => {
    const { id } = req.params;
    const { status, result, message } = await this.Model.getById({ id });
    if (!status) {
      return res.status(404).json({ message });
    }
    let fileIds
    try {
      fileIds = JSON.parse(result.dataValues.documentUrlMeeting);
    } catch {
      fileIds = [result.dataValues.documentUrlMeeting];
    }
    const authClient = await authorize();
    if (fileIds.length === 0) return res.status(404).json({ message: 'No documents found' });
    try {
      const zipStream = await downloadFilesAndCompress(authClient, fileIds);

      // Configurar las cabeceras de la respuesta
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="archivos_comprimidos.zip"');

      // Enviar el stream del archivo ZIP al cliente
      zipStream.pipe(res);
    } catch (error) {
      console.error('Error al descargar y comprimir los archivos:', error);
      res.status(500).send('Error al descargar y comprimir los archivos');
    }

  }

}
