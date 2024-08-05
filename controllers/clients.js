/* eslint-disable space-before-function-paren */
import { validateClient, validatePartialClient } from '../schemas/clients.js';

export class ClientController {
  constructor({ clientModel }) {
    this.clientModel = clientModel;
  }

  getAll = async (req, res) => {
    const { status, clients } = await this.clientModel.getAll();
    if (status) return res.json(clients);
    res.status(500).json({ message: `Error on get client: ${clients}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, client } = await this.clientModel.getById({ id });
    if (status) return res.json(client);
    res.status(404).json({ message: 'Client not found' });
  };

  create = async (req, res) => {
    const result = validateClient(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const { status, client } = await this.clientModel.createNew({ input: result.data });
    if (status) return res.status(201).json(client);
    res.status(500).json({ message: `Error creating client: ${client}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.clientModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: 'Client not found' });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const result = validatePartialClient(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const { status, client, message } = await this.clientModel.updateByPk({ id, input: result.data });

    if (status) return res.status(201).json(client);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: 'Error on updating client' });
  };
}
