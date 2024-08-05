/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class ServiceModel extends Model {
  static async getAll() {
    try {
      const services = await this.findAll({ raw: true });
      return { status: true, services };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const service = await this.findByPk(id, { raw: true });
      if (service !== null) return { status: true, service };
      return { status: false, message: 'service not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const {
      imageUrlService,
      valueService,
      nameService,
      categoryId,
      stateId,
      descriptionService
    } = input;
    try {
      const service = await this.create({
        image_url_service: imageUrlService,
        value_service: valueService,
        name_service: nameService,
        category_id: categoryId,
        state_id: stateId,
        description_service: descriptionService
      });
      const plainService = service.get({ plain: true });
      return { status: true, service: plainService };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const {
      image_url_service: imageUrlService,
      value_service: valueService,
      name_service: nameService,
      category_id: categoryId,
      state_id: stateId,
      description_service: descriptionService
    } = input;
    try {
      await this.update({
        id_service: id,
        image_url_service: imageUrlService,
        value_service: valueService,
        name_service: nameService,
        category_id: categoryId,
        state_id: stateId,
        description_service: descriptionService
      }, { where: { id_service: id } });
      const { status, service, message } = await this.getById({ id });
      if (status) { return { status, service }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { id_service: id } });
      return { status: true, message: 'Service deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
ServiceModel.init(

  {
    id_service: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    image_url_service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value_service: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    name_service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description_service: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Service'
  }
);
