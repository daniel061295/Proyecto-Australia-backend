/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Service extends Model {
  static async getAll() {
    try {
      const services = await this.findAll({ raw: true });
      return { status: true, services };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ idService }) {
    try {
      const service = await this.findByPk(idService, { raw: true });
      return { status: true, service };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async post({ imageUrlService, valueService, nameService, categoryId, stateId, descriptionService }) {
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

  static async put({ idService, imageUrlService, valueService, nameService, categoryId, stateId, descriptionService }) {
    try {
      await this.update({
        id_service: idService,
        image_url_service: imageUrlService,
        value_service: valueService,
        name_service: nameService,
        category_id: categoryId,
        state_id: stateId,
        description_service: descriptionService
      }, { where: { id_service: idService } });
      const { status, service } = await this.getById({ idService });
      return { status, service };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ idService }) {
    try {
      await this.destroy({ where: { id_service: idService } });
      return { status: true, message: 'Service deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
Service.init(

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

// test post
// Service.post({
//   imageUrlService: 'blobUrlService',
//   valueService: 1234556,
//   nameService: 'blobNameService',
//   categoryId: 15,
//   stateId: 1,
//   descriptionService: 'blobDescriptionService'
// }).then((result) => { console.log('Service:', result); });

// test getAll
// Service.getAll().then((result) => { console.log('Service:', result); });

// test getById
// Service.getById({ idService: 1 }).then((result) => { console.log('Service:', result); });

// test put
// Service.put({
//   idService: 2,
//   imageUrlService: 'NewBlobUrlService',
//   valueService: 1234556,
//   nameService: 'NewBlobNameService',
//   categoryId: 15,
//   stateId: 1,
//   descriptionService: 'blobDescriptionService'
// }).then((result) => { console.log('Service:', result); });

// test delete
// Service.delete({ idService: 2 }).then((result) => { console.log('Service:', result); });
