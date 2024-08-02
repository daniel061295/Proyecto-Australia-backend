/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Menu extends Model {
  static async getAll() {
    try {
      const menus = await this.findAll({ raw: true });
      return { status: true, menus };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ idMenu }) {
    try {
      const menu = await this.findByPk(idMenu, { raw: true });
      return { status: true, menu };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async post({ nameMenu }) {
    try {
      const menu = await this.create({ name_menu: nameMenu });
      const plainMenu = menu.get({ plain: true });
      return { status: true, menu: plainMenu };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async put({ idMenu, nameMenu }) {
    try {
      await this.update({ name_menu: nameMenu }, { where: { id_menu: idMenu } });
      const { status, menu } = await this.getById({ idMenu });
      return { status, menu };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ idMenu }) {
    try {
      await this.destroy({ where: { id_menu: idMenu } });
      return { status: true, message: 'Menu deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
Menu.init(

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

// // test post
// Menu.post({
//   nameMenu: 'blobMenu'
// }).then((result) => { console.log('Menu:', result); });

// test getAll
// Menu.getAll().then((result) => { console.log('Menu:', result); });

// test getById
// Menu.getById({ idMenu: 1 }).then((result) => { console.log('Menu:', result); });

// test put
// Menu.put({
//   idMenu: 1,
//   nameMenu: 'newBlobMenu'
// }).then((result) => { console.log('Menu:', result); });

// test delete
// Menu.delete({ idMenu: 1 }).then((result) => { console.log('Menu:', result); });
