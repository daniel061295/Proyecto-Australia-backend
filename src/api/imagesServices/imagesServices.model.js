/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { ServiceModel } from '../services/services.model.js';

export class ImagesServiceModel extends Model {
  static async getAll() {
    try {
      const services = await this.findAll({ raw: true });
      return { status: true, result: services };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const service = await this.findByPk(id, { raw: true });
      if (service !== null) return { status: true, result: service };
      return { status: false, message: 'image not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const {
      imageUrl,
      serviceId
    } = input;
    try {
      const service = await this.create({
        imageUrl,
        serviceId
      });
      const plainService = service.get({ plain: true });
      return { status: true, result: plainService };
    } catch (error) {
      return { status: false, result: error };
    }
  }

  static async updateByPk({ id, input }) {
    const {
      imageUrl,
      serviceId
    } = input;
    try {
      await this.update({
        imageUrl,
        serviceId
      }, { where: { idImagesService: id } });
      const { status, result, message } = await this.getById({ id });
      if (status) { return { status, result }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { idImagesService: id } });
      return { status: true, message: 'Image deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

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