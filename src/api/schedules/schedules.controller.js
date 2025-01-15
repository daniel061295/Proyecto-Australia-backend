/* eslint-disable space-before-function-paren */
import { BaseController } from '../../libs/BaseController.js';

export class ScheduleController extends BaseController {
  getByDate = async (req, res) => {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'date parameter is required' });
    }
    const { status, result, message } = await this.Model.getByDate({ dateString: date });
    if (status) return res.json(result);
    res.status(404).json({ message: `${message}` });

  }
}
