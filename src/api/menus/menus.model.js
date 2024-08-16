/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

export class MenuModel extends Model {
  static async getAll() {
    try {
      const menus = await this.findAll({ raw: true });
      return { status: true, result: menus };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const menu = await this.findByPk(id, { raw: true });
      if (menu !== null) return { status: true, result: menu };
      return { status: false, message: 'Menu not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const { nameMenu } = input;
    try {
      const menu = await this.create({ nameMenu });
      const plainMenu = menu.get({ plain: true });
      return { status: true, result: plainMenu };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const { nameMenu } = input;
    try {
      await this.update({ nameMenu }, { where: { idMenu: id } });
      const { status, result, message } = await this.getById({ id });
      if (status) { return { status, result }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { idMenu: id } });
      return { status: true, message: 'Menu deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
MenuModel.init(

  {
    idMenu: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameMenu: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Menus',
    underscored: true
  }
);
