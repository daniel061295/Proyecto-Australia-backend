/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class UserModel extends Model {
  static async getAll() {
    try {
      const users = await this.findAll({ raw: true });
      return { status: true, users };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const user = await this.findByPk(id, { raw: true });
      if (user !== null) return { status: true, user };
      return { status: false, message: 'User not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const {
      nameUser,
      passwordUser,
      emailUser,
      tokenUser,
      profileId
    } = input;
    try {
      const user = await this.create({
        name_user: nameUser,
        password_user: passwordUser,
        email_user: emailUser,
        token_user: tokenUser,
        profile_id: profileId
      });
      const plainUser = user.get({ plain: true });
      return { status: true, user: plainUser };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const {
      nameUser,
      passwordUser,
      emailUser,
      tokenUser,
      profileId
    } = input;
    try {
      await this.update({
        name_user: nameUser,
        password_user: passwordUser,
        email_user: emailUser,
        token_user: tokenUser,
        profile_id: profileId
      }, { where: { id_user: id } });
      const { status, user, message } = await this.getById({ id });
      if (status) { return { status, user }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { id_user: id } });
      return { status: true, message: 'User deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
UserModel.init(
  {
    id_user: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_user: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email_user: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    token_user: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);
