/* eslint-disable space-before-function-paren */
import { validateService, validatePartialService } from '../schemas/services.js';

export class ServiceController {
  constructor({ serviceModel }) {
    this.serviceModel = serviceModel;
  }

  getAll = async (req, res) => {
    const { status, services } = await this.serviceModel.getAll();
    if (status) return res.json(services);
    res.status(500).json({ message: `Error on get service: ${services}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, service } = await this.serviceModel.getById({ id });
    if (status) return res.json(service);
    res.status(404).json({ message: 'Service not found' });
  };

  create = async (req, res) => {
    const result = validateService(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const { status, service } = await this.serviceModel.createNew({ input: result.data });
    if (status) return res.status(201).json(service);
    res.status(500).json({ message: `Error creating service: ${service}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.serviceModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const result = validatePartialService(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const { status, service, message } = await this.serviceModel.updateByPk({ id, input: result.data });

    if (status) return res.status(201).json(service);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: 'Error on updating service' });
  };
}
