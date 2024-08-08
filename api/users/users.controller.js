/* eslint-disable space-before-function-paren */
import { Controller } from '../../libs/Controller.js';
import { LoginUserSchema } from './users.schema.js';
import bcrypt from 'bcrypt';

export class UserController extends Controller {
  create = async (req, res) => {
    const validationResult = this.Schema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }
    const {
      nameUser,
      passwordUser,
      emailUser,
      tokenUser,
      profileId
    } = validationResult.data;
    const { status, result } = await this.Model.createNew({
      input: {
        nameUser,
        passwordUser: await bcrypt.hash(passwordUser, 10),
        emailUser,
        tokenUser,
        profileId
      }
    });
    if (status) return res.status(201).json({ message: 'User successfully created' });
    res.status(500).json({ message: `Error on create method: ${result}` });
  };

  login = async (req, res) => {
    const loginUserSchema = new LoginUserSchema();
    const validationResult = loginUserSchema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }
    const { nameUser, passwordUser } = validationResult.data;
    const user = await this.Model.getByNameUser({ nameUser });

    if (!user) { return res.status(404).json({ message: `User ${nameUser} does not exist!` }); }

    const isValid = await bcrypt.compare(passwordUser, user.result.passwordUser);
    if (!isValid) { return res.status(401).json({ message: 'Invalid password' }); }
    return res.json({ message: 'Login Successful' });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, result } = await this.Model.getById({ id });
    if (status) {
      const {
        nameUser,
        emailUser,
        profileId
      } = result;
      return res.json({ nameUser, emailUser, profileId });
    }
    res.status(404).json({ message: `Object with id: ${id} not found` });
  };

  update = async (req, res) => {
    res.status(403).json({ message: 'Put request on this resource is forbidden' });
  };

  getAll = async (req, res) => {
    res.status(403).json({ message: 'Get request on this resource is forbidden' });
  };
}
