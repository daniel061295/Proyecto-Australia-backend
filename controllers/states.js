/* eslint-disable space-before-function-paren */
import { validateState, validatePartialState } from '../schemas/states.js';

export class StateController {
  constructor({ stateModel }) {
    this.stateModel = stateModel;
  }

  getAll = async (req, res) => {
    const { status, states } = await this.stateModel.getAll();
    if (status) return res.json(states);
    res.status(500).json({ message: `Error on get state: ${states}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, state } = await this.stateModel.getById({ id });
    if (status) return res.json(state);
    res.status(404).json({ message: 'State not found' });
  };

  create = async (req, res) => {
    const result = validateState(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const { status, state } = await this.stateModel.createNew({ input: result.data });
    if (status) return res.status(201).json(state);
    res.status(500).json({ message: `Error creating state: ${state}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.stateModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: 'State not found' });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const result = validatePartialState(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const { status, state, message } = await this.stateModel.updateByPk({ id, input: result.data });

    if (status) return res.status(201).json(state);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: 'Error on updating state' });
  };
}
