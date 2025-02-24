/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../../config/database.js';

import { BaseModel } from '../../libs/BaseModel.js';
import { ClientModel } from '../clients/clients.index.js';
import { ServiceModel } from '../services/services.model.js';
import { CategoryModel } from '../categories/categories.model.js';
import { StateModel } from '../states/states.model.js';
import { ScheduleModel } from '../schedules/schedules.model.js';
import { DateModel } from '../dates/dates.model.js';

export class MeetingModel extends BaseModel {
  static getIncludes(clientFilter = {}) {
    return [
      {
        model: ClientModel,
        as: 'client',
        where: clientFilter
      },
      {
        model: StateModel,
        as: 'state'
      },
      {
        model: ScheduleModel,
        as: 'schedule',
        attributes: { exclude: ['idDate'] },
        include: [
          {
            model: DateModel,
            as: 'date'
          }
        ]
      },
      {
        model: ServiceModel,
        as: 'service',
        attributes: { exclude: ['categoryId'] },
        include: [
          {
            model: CategoryModel,
            as: 'category'
          }
        ]
      },

    ];
  }
  static async getAll() {
    try {
      const records = await this.findAll({
        order: [['idMeeting', 'DESC']],
        attributes: ['idMeeting', 'documentUrlMeeting', 'descriptionMeeting'],
        include: this.getIncludes(),
      });
      return { status: true, result: records };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  static async getById({ id }) {
    try {
      const record = await this.findByPk(id, {
        attributes: ['idMeeting', 'documentUrlMeeting', 'descriptionMeeting'],
        include: this.getIncludes(),
      });
      if (record) return { status: true, result: record };
      return { status: false, message: 'Record not found!' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  static async getByFilter({ column, id }) {
    const attributes = await this.getAttributes();
    if (!attributes[column]) {
      return { status: false, message: `The column '${column}' does not exist` };
    }
    try {
      const meetings = await this.findAll({
        where: { [column]: id },
        attributes: ['idMeeting', 'documentUrlMeeting', 'descriptionMeeting'],
        include: this.getIncludes(),
      });
      if (meetings.length > 0) return { status: true, result: meetings };
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
        include: this.getIncludes({
          [column]: {
            [Op.like]: `%${value}%`
          },
        }),
        attributes: ['idMeeting', 'documentUrlMeeting', 'descriptionMeeting']
      });
      if (meetings.length > 0) return { status: true, result: meetings };
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
    scheduleId: {
      type: Sequelize.INTEGER,
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
    },
    documentUrlMeeting: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descriptionMeeting: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'Meetings',
    underscored: true
  }
);
