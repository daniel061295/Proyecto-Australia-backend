/* eslint-disable space-before-function-paren */
import { Controller } from '../../libs/Controller.js';
import { ImagesServiceModel } from '../imagesServices/imagesServices.index.js';
import { deleteFile } from '../../libs/utils/deleteFile.js';

export class ServiceController extends Controller {
  create = async (req, res) => {
    const validationResult = this.Schema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }
    if (!req.file) {
      return res.status(422).json({ error: 'No file uploaded' })
    }
    const payload = {
      imageUrlService: req.file.path,
      ...validationResult.data
    }
    const { status, result } = await this.Model.createNew({ input: payload });
    if (status) return res.status(201).json(result);
    res.status(500).json({ message: `Error on create method: ${result}` });
  };
  getByCategory = async (req, res) => {
    const { idCategory } = req.query;
    if (!idCategory) {
      return res.status(400).json({ error: 'idCategory parameter is required' });
    }
    const { status, result } = await this.Model.getByCategory({ idCategory });
    if (status) return res.json(result);
    res.status(404).json({ message: `Objects with idCategory: ${idCategory} not found` });

  }
  getById = async (req, res) => {
    const { id } = req.params;
    const { status, result, message } = await this.Model.getById({ id });
    if (status) {
      const imagesResult = await ImagesServiceModel.getByService({ idService: id });
      if (imagesResult.status) {
        return res.status(200).json({
          ...result,
          images: imagesResult.result
        })
      } else {
        return res.status(200).json({ message })
      }
    }
    res.status(500).json({ message: result });
  }
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      const byId = await this.Model.getById({ id });
      if (!byId.status) {
        return res.status(404).json({ message: `Object with id: ${id} not found` });
      }

      const { imageUrlService } = byId.result;
      const fileResult = await deleteFile(imageUrlService);

      if (!fileResult.success) {
        const errorMessage = fileResult.errorCode === 'ENOENT'
          ? 'File not found!'
          : 'Error deleting the file.';
        return res.status(fileResult.errorCode === 'ENOENT' ? 404 : 500).json({ error: errorMessage });
      }

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
      if (req.file) {
        const byId = await this.Model.getById({ id });
        if (!byId.status) {
          return res.status(404).json({ message: `Object with id: ${id} not found` });
        }

        const { imageUrlService } = byId.result;
        if (imageUrlService && imageUrlService !== req.file.path) {
          const fileResult = await deleteFile(imageUrlService);
          if (!fileResult.success) {
            const errorMessage = fileResult.errorCode === 'ENOENT'
              ? 'File not found!'
              : 'Error deleting the file.';
            return res.status(fileResult.errorCode === 'ENOENT' ? 404 : 500).json({ error: errorMessage });
          }
        }

        payload = { ...payload, imageUrlService: req.file.path };
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
}
