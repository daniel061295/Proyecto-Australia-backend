/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Client extends Model {
  static async getAll() {
    try {
      const clients = await this.findAll({ raw: true });
      return { status: true, clients };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ idClient }) {
    try {
      const client = await this.findByPk(idClient, { raw: true });
      return { status: true, client };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async post({ nameClient, emailClient, phoneNumberClient }) {
    try {
      const client = await this.create({
        name_client: nameClient,
        email_client: emailClient,
        phone_number_client: phoneNumberClient
      });
      const plainClient = client.get({ plain: true });
      return { status: true, client: plainClient };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async put({ idClient, nameClient, emailClient, phoneNumberClient }) {
    try {
      await this.update({
        name_client: nameClient,
        email_client: emailClient,
        phone_number_client: phoneNumberClient
      }, { where: { id_client: idClient } });
      const { status, client } = await this.getById({ idClient });
      return { status, client };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ idClient }) {
    try {
      await this.destroy({ where: { id_client: idClient } });
      return { status: true, message: 'Client deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
Client.init(

  {
    id_client: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_client: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_client: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number_client: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Client'
  }
);

// test post
// Client.post({
//   nameClient: 'blobClient',
//   emailClient: 'blobClient@example.com',
//   phoneNumberClient: 3421313132121
// }).then((result) => { console.log('Client:', result); });

// test getAll
// Client.getAll().then((result) => { console.log('Client:', result); });

// test getById
// Client.getById({ idClient: 1 }).then((result) => { console.log('Client:', result); });

// test put
// Client.put({
//   idClient: 1,
//   nameClient: 'newBlobClient',
//   emailClient: 'newBlobClient@example.com',
//   phoneNumberClient: 3421366632121
// }).then((result) => { console.log('Client:', result); });

// test delete
// Client.delete({ idClient: 2 }).then((result) => { console.log('Client:', result); });
