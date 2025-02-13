/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { DateModel } from '../dates/dates.index.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class ScheduleModel extends BaseModel {
  static async getAll() {
    try {
      const schedules = await this.findAll({
        raw: true,
        include: [
          {
            model: DateModel,
            attributes: ['dateString'],
            as: "date"
            // where: { dateString: dateString },

          }
        ]
      });
      return { status: true, result: schedules };
    } catch (error) {
      return { status: false, message: error };
    }
  }


  static async getByDate({ dateString }) {
    try {
      const schedule = await this.findAll({
        include: [
          {
            model: DateModel,
            attributes: ['dateString'],
            as: "date",
            where: { 'dateString': dateString }
          }
        ]
      }, { raw: true });

      if (schedule.length > 0) return {
        status: true, result: await schedule.map(
          (item) => {
            const { idDate, date, ...filteredDataValues } = item.dataValues;
            const output = {
              ...filteredDataValues,
              date: date.dateString
            }
            return output;
          }
        )
      };
      return { status: false, message: 'No records found for the specified input!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const schedule = await this.findByPk(id, {
        include: [
          {
            model: DateModel,
            as: "date",
          }
        ]
      });
      // console.log(schedule)
      return (schedule.dataValues)
      // if (schedule) return {
      //   status: true, result: await schedule.map(
      //     (item) => {
      //       const { idDate, date, ...filteredDataValues } = item.dataValues;
      //       const output = {
      //         ...filteredDataValues,
      //         date: date.dateString
      //       }
      //       return output;
      //     }
      //   )
      // };
      // return { status: false, message: 'No records found for the specified input!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }


}
ScheduleModel.init(

  {
    idSchedule: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    scheduleStartTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    scheduleEndTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    scheduleCount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    idDate: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    scheduleTimeSlot: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Schedules',
    underscored: true
  }
);
