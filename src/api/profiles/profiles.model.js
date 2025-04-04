/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class ProfileModel extends BaseModel { }
ProfileModel.init(

  {
    idProfile: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameProfile: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Profiles',
    underscored: true
  }
);
