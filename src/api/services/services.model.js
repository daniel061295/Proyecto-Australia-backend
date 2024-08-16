/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

export class ServiceModel extends Model {
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
        imageUrlService,
        valueService,
        nameService,
        categoryId,
        stateId,
        descriptionService
      });
      const plainService = service.get({ plain: true });
      return { status: true, result: plainService };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const {
      imageUrlService,
      valueService,
      nameService,
      categoryId,
      stateId,
      descriptionService
    } = input;
    try {
      await this.update({
        imageUrlService,
        valueService,
        nameService,
        categoryId,
        stateId,
        descriptionService
      }, { where: { idService: id } });
      const { status, result, message } = await this.getById({ id });
      if (status) { return { status, result }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { idService: id } });
      return { status: true, message: 'Service deleted successfully' };
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
      type: DataTypes.NUMBER,
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
