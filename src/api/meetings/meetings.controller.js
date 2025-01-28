/* eslint-disable space-before-function-paren */
import { BaseController } from '../../libs/BaseController.js';
import { MeetingWithClientSchema } from './meetings.schema.js'
import { ClientModel } from '../clients/clients.model.js';
import { deleteFile } from '../../libs/utils/deleteFile.js';
import { authorize, downloadFile } from '../../libs/services/googleApi.service.js';

export class MeetingController extends BaseController {
  createMeetingWithClient = async (req, res) => {
    const meetingWithClientSchema = new MeetingWithClientSchema;
    const validationResult = meetingWithClientSchema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }

    // if (!req.file) {
    //   return res.status(422).json({ error: 'No file uploaded' })
    // }

    const validatedData = validationResult.data;
    const client = await this.getOrCreateClient(validatedData);
    const sameSchedule = await this.Model.getByFilter({ column: 'scheduleId', id: validatedData.scheduleId })
    if (sameSchedule.status) {
      return res.status(401).json({ error: 'This time slot is already booked' });
    }
    const { status, result, message } = await this.Model.createNew({
      input: {
        scheduleId: validatedData.scheduleId,
        stateId: validatedData.stateId,
        clientId: client.idClient,
        serviceId: validatedData.serviceId,
        documentUrlMeeting: req.file ? req.file.driveId : '',
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
    res.status(404).json({ message: `Error: ${message}` });
  };

  getByClientFilter = async (req, res) => {
    const column = Object.keys(req.query)[0];
    const value = req.query[column];
    const { status, result, message } = await this.Model.getByClientFilter({ column, value });
    if (status) return res.json(result);
    res.status(404).json({ message: `Error: ${message}` });
  }

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const byId = await this.Model.getById({ id });
      if (!byId.status) {
        return res.status(404).json({ message: `Object with id: ${id} not found` });
      }

      const { documentUrlMeeting } = byId.result;

      const fileResult = documentUrlMeeting ? await deleteFile(documentUrlMeeting) : '';

      // if (!fileResult.success) {
      //   const errorMessage = fileResult.errorCode === 'ENOENT'
      //     ? 'File not found!'
      //     : 'Error deleting the file.';
      //   return res.status(fileResult.errorCode === 'ENOENT' ? 404 : 500).json({ error: errorMessage });
      // }

      const { status, message } = await this.Model.delete({ id });
      if (!status) {
        return res.status(404).json({ message });
      }

      return res.status(200).json({ message });

    } catch (error) {
      console.error(`Error in delete handler: ${error.message}`);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;

    try {
      const validationResult = this.Schema.validatePartial(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ error: JSON.parse(validationResult.error.message) });
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
            return res.status(fileResult.errorCode === 'ENOENT' ? 404 : 500).json({ error: errorMessage });
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
      return res.status(500).json({ error: 'Internal server error.' });
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
      const fileStream = await downloadFile(authClient, result.dataValues.documentUrlMeeting);
      res.setHeader('Content-Disposition', `attachment; filename="${result.dataValues.documentUrlMeeting}"`);
      res.setHeader('Content-Type', 'application/octet-stream');
      fileStream.on('end', () => {
        res.end();
      });
      fileStream.pipe(res);
    } catch (error) {
      console.error(`Error in getDocumentFromGoogleApi handler: ${error.message}`);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}
