/* eslint-disable space-before-function-paren */

export class Controller {
  constructor({ Model, Schema }) {
    this.Model = Model;
    this.Schema = Schema;
  }

  getAll = async (req, res) => {
    const { status, result } = await this.Model.getAll();
    if (status) return res.json(result);
    res.status(500).json({ message: `Error on get method: ${result}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, result } = await this.Model.getById({ id });
    if (status) return res.json(result);
    res.status(404).json({ message: `Object with id: ${id} not found` });
  };

  create = async (req, res) => {
    const validationResult = this.Schema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }
    const { status, result } = await this.Model.createNew({ input: validationResult.data });
    if (status) return res.status(201).json(result);
    res.status(500).json({ message: `Error on create method: ${result}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.Model.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: `Object with id: ${id} not found` });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const validationResult = this.Schema.validatePartial(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ error: JSON.parse(validationResult.error.message) });
    }

    const { id } = req.params;
    const { status, result, message } = await this.Model.updateByPk({ id, input: validationResult.data });

    if (status) return res.status(201).json(result);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: `Error on update method: ${result}` });
  };
}
