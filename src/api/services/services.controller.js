/* eslint-disable space-before-function-paren */
import { BaseController } from '../../libs/BaseController.js';
import { ImagesServiceModel } from '../imagesServices/imagesServices.index.js';
import { deleteFile } from '../../libs/utils/deleteFile.js';

export class ServiceController extends BaseController {
  create = async (req, res) => {
    const validationResult = this.Schema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ message: JSON.parse(validationResult.error.message) });
    }
    if (!req.file) {
      return res.status(422).json({ message: 'No file uploaded' })
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
      return res.status(400).json({ message: 'idCategory parameter is required' });
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
    this.deleteWithFile(req, res, 'imageUrlService');
  };

  update = async (req, res) => {
    this.updateWithFile(req, res, 'imageUrlService');
  };
}
