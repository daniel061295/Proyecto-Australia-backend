/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { BaseModel } from '../../libs/BaseModel.js';
import { ServiceModel } from '../services/services.model.js';

export class CategoryModel extends BaseModel {

  static async getAll() {
    try {
      const records = await this.findAll({
        attributes: { exclude: ['serviceId'] },
        include: [
          {
            model: ServiceModel,
            as: 'services',
            attributes: { exclude: ['categoryId'] }
          },
        ],
      });
      return { status: true, result: records };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
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