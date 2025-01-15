/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class DateModel extends BaseModel { }
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
    }
  },
  {
    sequelize,
    tableName: 'Dates',
    underscored: true
  }
);
