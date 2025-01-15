/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class SubmenuModel extends BaseModel { }
SubmenuModel.init(
  {
    idSubmenu: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameSubmenu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Submenus',
    underscored: true
  }
);
