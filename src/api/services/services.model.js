/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { CategoryModel } from '../categories/categories.model.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class ServiceModel extends BaseModel {
  static async getById({ id }) {
    try {
      const service = await this.findByPk(id, {
        raw: true, include: [
          {
            model: CategoryModel,
            as: 'category',
            attributes: ['nameCategory'],
          }
        ]
      });
      if (service !== null) return { status: true, result: service };
      return { status: false, message: 'service not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getByCategory({ idCategory }) {
    try {
      const service = await this.findAll({
        include: [
          {
            model: CategoryModel,
            as: 'category',
            where: { idCategory: idCategory },
          }
        ]
      }, { raw: true });
      if (service !== null) return { status: true, result: service };
      return { status: false, message: 'No services found for the specified category!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
ServiceModel.init(

  {
    idService: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    imageUrlService: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valueService: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nameService: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descriptionService: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Services',
    underscored: true
  }
);
