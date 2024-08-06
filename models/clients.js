/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class ClientModel extends Model {
  static async getAll() {
    try {
      const clients = await this.findAll({ raw: true });
      return { status: true, clients };
    } catch (error) {
      return { status: false, clients: error };
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
        nameClient,
        emailClient,
        phoneNumberClient
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
      await this.destroy({ where: { idClient: id } });
      return { status: true, message: 'Client deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
ClientModel.init(

  {
    idClient: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameClient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailClient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumberClient: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Clients',
    underscored: true
  }
);
