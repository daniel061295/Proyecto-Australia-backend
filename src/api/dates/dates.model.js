/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';
import { ScheduleModel } from '../schedules/schedules.model.js';

export class DateModel extends BaseModel {
  static async getAll() {
    try {
      const records = await this.findAll({
        attributes: { exclude: ['idSchedule'] },
        include: [
          {
            model: ScheduleModel,
            as: 'schedules',
            attributes: { exclude: ['idDate'] }
          },
        ],
      });
      return { status: true, result: records };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
DateModel.init(

  {
    idDate: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dateString: {
      type: DataTypes.DATEONLY,
      // unique: true,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Dates',
    underscored: true
  }
);
