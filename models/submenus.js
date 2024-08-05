/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class SubmenuModel extends Model {
  static async getAll() {
    try {
      const submenus = await this.findAll({ raw: true });
      return { status: true, submenus };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const submenu = await this.findByPk(id, { raw: true });
      if (submenu !== null) return { status: true, submenu };
      return { status: false, message: 'Submenu not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const {
      nameSubmenu,
      menuId
    } = input;
    try {
      const submenu = await this.create({
        name_submenu: nameSubmenu,
        menu_id: menuId
      });
      const plainSubmenu = submenu.get({ plain: true });
      return { status: true, submenu: plainSubmenu };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const {
      nameSubmenu,
      menuId
    } = input;
    try {
      await this.update({
        name_submenu: nameSubmenu,
        menu_id: menuId
      }, { where: { id_submenu: id } });
      const { status, submenu, message } = await this.getById({ id });
      if (status) { return { status, submenu }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { id_submenu: id } });
      return { status: true, message: 'Submenu deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
SubmenuModel.init(
  {
    id_submenu: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_submenu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Submenu'
  }
);
