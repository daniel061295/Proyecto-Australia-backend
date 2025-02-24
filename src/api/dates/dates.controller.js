/* eslint-disable space-before-function-paren */
import { BaseController } from '../../libs/BaseController.js';

export class DateController extends BaseController {

  createNewDate = async (req, res) => {
    try {
      const actualDate = new Date();
      actualDate.setDate(actualDate.getDate() + 30);
      const { status, result, message } = await this.Model.createNew({ input: { dateString: actualDate.toISOString().split('T')[0], isActive: true } });
      console.log(actualDate.toISOString().split('T')[0]);
      if (!status) return res.status(500).json({ message: `Error on create method: ${message}` });
      return res.status(201).json(result);

    } catch (error) {
      console.log(error)
    }
  }

}