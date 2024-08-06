/* eslint-disable space-before-function-paren */

export class BaseController {
  constructor({ baseModel, baseSchema }) {
    this.baseModel = baseModel;
    this.baseSchema = baseSchema;
  }

  getAll = async (req, res) => {
    const { status, result } = await this.baseModel.getAll();
    if (status) return res.json(result);
    res.status(500).json({ message: `Error on get method: ${result}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, result } = await this.baseModel.getById({ id });
    if (status) return res.json(result);
    res.status(404).json({ message: `Object with id: ${id} not found` });
  };

  create = async (req, res) => {
    const validationResult = this.baseSchema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }
    const { status, result } = await this.baseModel.createNew({ input: validationResult.data });
    if (status) return res.status(201).json(result);
    res.status(500).json({ message: `Error on create method: ${result}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.baseModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: `Object with id: ${id} not found` });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const validationResult = this.baseSchema.validatePartial(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ error: JSON.parse(validationResult.error.message) });
    }

    const { id } = req.params;
    const { status, result, message } = await this.baseModel.updateByPk({ id, input: validationResult.data });

    if (status) return res.status(201).json(result);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: `Error on update method: ${result}` });
  };
}
