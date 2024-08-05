/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class ClientModel extends Model {
  static async getAll() {
    try {
      const clients = await this.findAll({ raw: true });
      return { status: true, clients };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const client = await this.findByPk(id, { raw: true });
      if (client !== null) return { status: true, client };
      return { status: false, message: 'Client not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const {
      nameClient,
      emailClient,
      phoneNumberClient
    } = input;
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

  static async updateByPk({ id, input }) {
    const {
      nameClient,
      emailClient,
      phoneNumberClient
    } = input;
    try {
      await this.update({
        name_client: nameClient,
        email_client: emailClient,
        phone_number_client: phoneNumberClient
      }, { where: { id_client: id } });
      const { status, client, message } = await this.getById({ id });
      if (status) { return { status, client }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { id_client: id } });
      return { status: true, message: 'Client deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
ClientModel.init(

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
