/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { ServiceModel } from '../services/services.model.js';
import { BaseModel } from '../../libs/BaseModel.js';

export class ImagesServiceModel extends BaseModel {
  static async getByService({ idService }) {
    try {
      const images = await this.findAll({
        include: [
          {
            model: ServiceModel,
            as: 'images',
            where: { idService: idService },
          }
        ]
      }, { raw: true });
      if (images !== null) return {
        status: true, result: await images.map(item => {
          const { images, ...filteredDataValues } = item.dataValues;
          return filteredDataValues;
        })
      };
      return { status: false, message: 'No Images found for the specified service!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
ImagesServiceModel.init(

  {
    idImagesService: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'ImagesServices',
    underscored: true
  }
);