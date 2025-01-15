/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class StateModel extends BaseModel { }
StateModel.init(

  {
    idState: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    applyForService: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'States',
    underscored: true
  }
);
