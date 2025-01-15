/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class UserModel extends BaseModel {
  static async getByNameUser({ nameUser }) {
    try {
      const user = await this.findOne({ where: { nameUser }, raw: true });
      if (user !== null) { return { status: true, result: user }; }
      return { status: false, result: 'User not found' };
    } catch (error) {
      return { status: false, result: error };
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
