/* eslint-disable space-before-function-paren */
import { validateUser, validatePartialUser } from '../schemas/users.js';

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    const { status, users } = await this.userModel.getAll();
    if (status) return res.json(users);
    res.status(500).json({ message: `Error on get user: ${users}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, user } = await this.userModel.getById({ id });
    if (status) return res.json(user);
    res.status(404).json({ message: 'User not found' });
  };

  create = async (req, res) => {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const { status, user } = await this.userModel.createNew({ input: result.data });
    if (status) return res.status(201).json(user);
    res.status(500).json({ message: `Error creating user: ${user}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.userModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const { status, user, message } = await this.userModel.updateByPk({ id, input: result.data });

    if (status) return res.status(201).json(user);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: 'Error on updating user' });
  };
}
