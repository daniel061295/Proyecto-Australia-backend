/* eslint-disable space-before-function-paren */
import { BaseController } from '../../libs/BaseController.js';
import { LoginUserSchema } from './users.schema.js';
import { SECRET_JWT_KEY } from '../../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UserController extends BaseController {
  create = async (req, res) => {
    const validationResult = this.Schema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }

    const { status, result } = await this.Model.createNew({
      input: {
        ...validationResult.data,
        passwordUser: await bcrypt.hash(validationResult.data.passwordUser, 10)
      }
    });
    if (status) return res.status(201).json({ message: 'User successfully created' });
    res.status(500).json({ message: `Error on create method: ${result}` });
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

  login = async (req, res) => {
    const loginUserSchema = new LoginUserSchema();

    const validationResult = loginUserSchema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({
        error: JSON.parse(validationResult.error.message)
      });
    }
    const { nameUser, passwordUser } = validationResult.data;

    const user = await this.Model.getByNameUser({ nameUser });
    if (!user.status) { return res.status(404).json({ message: `User ${nameUser} does not exist!` }); }

    const isValid = await bcrypt.compare(passwordUser, user.result.passwordUser);
    if (!isValid) { return res.status(401).json({ message: 'Invalid password' }); }
    const token = jwt.sign(
      {
        idUser: user.result.idUser,
        nameUser: user.result.nameUser,
        passwordUser: user.result.passwordUser
      }, SECRET_JWT_KEY, { expiresIn: 3600 * 1 }); // 3600 * 1 expires in 1 hour
    return res
      .cookie('access_token', token)
      .json({ message: 'Login Successful' });
  };

  logout = async (req, res) => {
    res
      .clearCookie('access_token')
      .json({ message: 'Logout Successful' });
  };
}
