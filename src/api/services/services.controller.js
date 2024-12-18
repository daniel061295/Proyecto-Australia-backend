/* eslint-disable space-before-function-paren */
import { Controller } from '../../libs/Controller.js';
import { ImagesServiceModel } from '../imagesServices/imagesServices.index.js';

export class ServiceController extends Controller {
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
        return res.status(200).json({ result })
      }
    }
    res.status(500).json({ message: result });
  }
}
