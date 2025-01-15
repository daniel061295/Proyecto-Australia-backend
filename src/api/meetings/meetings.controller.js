/* eslint-disable space-before-function-paren */
import { BaseController } from '../../libs/BaseController.js';
import { MeetingWithClientSchema } from './meetings.schema.js'
import { ClientModel } from '../clients/clients.model.js';

export class MeetingController extends BaseController {
  createMeetingWithClient = async (req, res) => {
    const meetingWithClientSchema = new MeetingWithClientSchema;
    const validationResult = meetingWithClientSchema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }
    const validatedData = validationResult.data;

    const client = await this.getOrCreateClient(validatedData);

    const { status, result, message } = await this.Model.createNew({
      input: {
        dateTimeMeeting: validatedData.dateTimeMeeting,
        stateId: validatedData.stateId,
        clientId: client.idClient,
        serviceId: validatedData.serviceId

      }
    });
    if (status) return res.status(201).json(result);
    res.status(500).json({ message: `Error on create method: ${message}` });

  };

  async getOrCreateClient(data) {
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

}
