/* eslint-disable space-before-function-paren */
import { BaseController } from '../../libs/BaseController.js';



export class CategoryController extends BaseController {
  create = async (req, res) => {
    const validationResult = this.Schema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }
    // if (!req.file) {
    //   return res.status(422).json({ error: 'No file uploaded' })
    // }
    const payload = {
      imageUrlCategory: req.file ? req.file.path : '',
      ...validationResult.data
    }
    const { status, result } = await this.Model.createNew({ input: payload });
    if (status) return res.status(201).json(result);
    res.status(500).json({ message: `Error on create method: ${result}` });
  };

  delete = async (req, res) => {
    return this.deleteWithFile(req, res, 'imageUrlCategory');
  };

  update = async (req, res) => {
    return this.updateWithFile(req, res, 'imageUrlCategory');
  };

}
