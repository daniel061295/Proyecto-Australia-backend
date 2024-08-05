/* eslint-disable space-before-function-paren */
import { validateMeeting, validatePartialMeeting } from '../schemas/meetings.js';

export class MeetingController {
  constructor({ meetingModel }) {
    this.meetingModel = meetingModel;
  }

  getAll = async (req, res) => {
    const { status, meetings } = await this.meetingModel.getAll();
    if (status) return res.json(meetings);
    res.status(500).json({ message: `Error on get meeting: ${meetings}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, meeting } = await this.meetingModel.getById({ id });
    if (status) return res.json(meeting);
    res.status(404).json({ message: 'Meeting not found' });
  };

  create = async (req, res) => {
    const result = validateMeeting(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const { status, meeting } = await this.meetingModel.createNew({ input: result.data });
    if (status) return res.status(201).json(meeting);
    res.status(500).json({ message: `Error creating meeting: ${meeting}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.meetingModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const result = validatePartialMeeting(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const { status, meeting, message } = await this.meetingModel.updateByPk({ id, input: result.data });

    if (status) return res.status(201).json(meeting);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: 'Error on updating meeting' });
  };
}
