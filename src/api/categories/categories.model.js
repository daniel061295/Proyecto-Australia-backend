/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class CategoryModel extends BaseModel { }
CategoryModel.init(

  {
    idCategory: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true

    },
    nameCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrlCategory: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Categories',
    underscored: true
  }
);