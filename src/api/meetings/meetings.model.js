/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../../config/database.js';

import { ClientModel } from '../clients/clients.index.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class MeetingModel extends BaseModel {

  static async getByFilter({ column, id }) {
    const attributes = await this.getAttributes();
    if (!attributes[column]) {
      return { status: false, message: `The column '${column}' does not exist` };
    }
    try {
      const meetings = await this.findAll({
        where: { [column]: id }
      }, { raw: true });
      if (meetings !== null) return { status: true, result: meetings };
      return { status: false, message: `No meetings found for the specified ${column}!` };
    } catch (error) {
      return { status: false, message: error };
    }
  }
  static async getByClientFilter({ column, value }) {
    const attributes = await ClientModel.getAttributes();
    if (!attributes[column]) {
      return { status: false, message: `The column '${column}' does not exist` };
    }
    try {
      const meetings = await this.findAll({
        include: [
          {
            model: ClientModel,
            as: 'client',
            where: {
              [column]: {
                [Op.like]: `%${value}%`
              },
            },
          },
        ],
        attributes: { exclude: 'clientId' }
      }, { raw: true });
      if (meetings !== null) return { status: true, result: meetings };
      return { status: false, message: `No meetings found for the specified ${column}!` };
    } catch (error) {
      return { status: false, message: error };
    }
  }

}

MeetingModel.init(
  {
    idMeeting: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dateTimeMeeting: {
      type: DataTypes.DATE,
      allowNull: false
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Meetings',
    underscored: true
  }
);
