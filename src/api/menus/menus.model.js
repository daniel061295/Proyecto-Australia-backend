/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class MenuModel extends BaseModel { }
MenuModel.init(

  {
    idMenu: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameMenu: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Menus',
    underscored: true
  }
);
