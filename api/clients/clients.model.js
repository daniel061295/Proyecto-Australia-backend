/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

export class ClientModel extends Model {
  static async getAll() {
    try {
      const clients = await this.findAll({ raw: true });
      return { status: true, result: clients };
    } catch (error) {
      return { status: false, result: error };
    }
  }

  static async getById({ id }) {
    try {
      const client = await this.findByPk(id, { raw: true });
      if (client !== null) return { status: true, result: client };
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
        nameClient,
        emailClient,
        phoneNumberClient
      });
      const plainClient = client.get({ plain: true });
      return { status: true, result: plainClient };
    } catch (error) {
      return { status: false, result: error };
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
      const { status, result, message } = await this.getById({ id });
      console.log(status);
      if (status) { return { status, result }; }
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
