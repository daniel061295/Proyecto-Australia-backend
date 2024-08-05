/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class MenuModel extends Model {
  static async getAll() {
    try {
      const menus = await this.findAll({ raw: true });
      return { status: true, menus };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const menu = await this.findByPk(id, { raw: true });
      if (menu !== null) return { status: true, menu };
      return { status: false, message: 'Menu not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const { nameMenu } = input;
    try {
      const menu = await this.create({ name_menu: nameMenu });
      const plainMenu = menu.get({ plain: true });
      return { status: true, menu: plainMenu };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const { nameMenu } = input;
    try {
      await this.update({ name_menu: nameMenu }, { where: { id_menu: id } });
      const { status, menu, message } = await this.getById({ id });
      if (status) { return { status, menu }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { id_menu: id } });
      return { status: true, message: 'Menu deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
MenuModel.init(

  {
    id_menu: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_menu: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Menu'
  }
);
