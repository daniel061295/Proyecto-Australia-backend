/* eslint-disable space-before-function-paren */
import { Controller } from '../../libs/Controller.js';
import { MeetingWithClientSchema } from './meetings.schema.js'
import { ClientModel } from '../clients/clients.model.js';

export class MeetingController extends Controller {
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
  }

}
