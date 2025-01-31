import { deleteFile } from "./utils/deleteFile.js";

/* eslint-disable space-before-function-paren */
export class BaseController {
  constructor({ Model, Schema }) {
    this.Model = Model;
    this.Schema = Schema;
  }

  getAll = async (req, res) => {
    const { status, result, message } = await this.Model.getAll();
    if (status) return res.json(result);
    res.status(500).json({ message: `Error on get method: ${message}` });
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
    const { status, result, message } = await this.Model.createNew({ input: validationResult.data });
    if (status) return res.status(201).json(result);
    res.status(500).json({ message: `Error on create method: ${message}` });
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

  deleteWithFile = async (req, res, fileColumn) => {
    const { id } = req.params;

    try {
      const byId = await this.Model.getById({ id });
      if (!byId.status) {
        return res.status(404).json({ message: `Object with id: ${id} not found` });
      }

      this.deleteFileIfExists(byId, fileColumn);

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

  deleteFileIfExists = async (context, column) => {
    const filePath = context.result[column];

    const fileResult = await deleteFile(filePath);
    if (!fileResult.success && fileResult.errorCode !== 'ENOENT') {
      return res.status(fileResult.errorCode === 'ENOENT' ? 404 : 500).json({ error: 'Error deleting the file.' });
    }
  };

  updateWithFile = async (req, res, fileColumn) => {
    const { id } = req.params;
    try {
      const byId = await this.Model.getById({ id });
      if (!byId.status) {
        return res.status(404).json({ message: `Object with id: ${id} not found` });
      }
      const validationResult = this.Schema.validatePartial(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ error: JSON.parse(validationResult.error.message) });
      }
      let payload = validationResult.data;

      if (req.file) {
        this.deleteFileIfExists(byId, fileColumn);
        payload = { ...payload, [fileColumn]: req.file.path };
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
  getByFilter = async (req, res) => {
    const column = Object.keys(req.query)[0];
    const id = req.query[column];
    const { status, result, message } = await this.Model.getByFilter({ column, id });
    if (status) return res.json(result);
    res.status(404).json({ message: `Error: ${message}` });
  };
}
