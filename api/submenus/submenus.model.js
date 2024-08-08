/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

export class SubmenuModel extends Model {
  static async getAll() {
    try {
      const submenus = await this.findAll({ raw: true });
      return { status: true, result: submenus };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const submenu = await this.findByPk(id, { raw: true });
      if (submenu !== null) return { status: true, result: submenu };
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
        nameSubmenu,
        menuId
      });
      const plainSubmenu = submenu.get({ plain: true });
      return { status: true, result: plainSubmenu };
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
        nameSubmenu,
        menuId
      }, { where: { idSubmenu: id } });
      const { status, result, message } = await this.getById({ id });
      if (status) { return { status, result }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { idSubmenu: id } });
      return { status: true, message: 'Submenu deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
SubmenuModel.init(
  {
    idSubmenu: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameSubmenu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Submenus',
    underscored: true
  }
);
