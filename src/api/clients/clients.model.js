/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model, where } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class ClientModel extends BaseModel {
  static async getByEmail({ emailClient }) {
    try {
      const clients = await this.findAll({ where: { emailClient } }, { raw: true });
      if (clients.length > 0) return { status: true, result: clients[0].dataValues };
      return { status: false, result: 'Client not found!' };
    } catch (error) {
      return { status: false, result: error };
    }
  }
}
ClientModel.init(

  {
    idClient: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameClient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailClient: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: false
    },
    phoneNumberClient: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Clients',
    underscored: true
  }
);
