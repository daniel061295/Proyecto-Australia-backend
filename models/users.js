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
        nameUser,
        passwordUser,
        emailUser,
        tokenUser,
        profileId
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
        nameUser,
        passwordUser,
        emailUser,
        tokenUser,
        profileId
      }, { where: { idUser: id } });
      const { status, user, message } = await this.getById({ id });
      if (status) { return { status, user }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { idUser: id } });
      return { status: true, message: 'User deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
UserModel.init(
  {
    idUser: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordUser: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    emailUser: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tokenUser: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Users',
    underscored: true
  }
);
