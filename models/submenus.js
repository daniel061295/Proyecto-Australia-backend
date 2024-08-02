/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Submenu extends Model {
  static async getAll() {
    try {
      const submenus = await this.findAll({ raw: true });
      return { status: true, submenus };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ idSubmenu }) {
    try {
      const submenu = await this.findByPk(idSubmenu, { raw: true });
      return { status: true, submenu };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async post({ nameSubmenu, menuId }) {
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

  static async put({ idSubmenu, nameSubmenu, menuId }) {
    try {
      await this.update({
        name_submenu: nameSubmenu,
        menu_id: menuId
      }, { where: { id_submenu: idSubmenu } });
      const { status, submenu } = await this.getById({ idSubmenu });
      return { status, submenu };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ idSubmenu }) {
    try {
      await this.destroy({ where: { id_submenu: idSubmenu } });
      return { status: true, message: 'Submenu deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
Submenu.init(
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

// // test post
// Submenu.post({
//   nameSubmenu: 'blobSubmenu',
//   menuId: 1
// }).then((result) => { console.log('Submenu:', result); });

// test getAll
// Submenu.getAll().then((result) => { console.log('Submenu:', result); });

// test getById
// Submenu.getById({ idSubmenu: 1 }).then((result) => { console.log('Submenu:', result); });

// test put
// Submenu.put({
//   idSubmenu: 1,
//   nameSubmenu: 'newBlobSubmenu',
//   menuId: 1
// }).then((result) => { console.log('Submenu:', result); });

// test delete
// Submenu.delete({ idSubmenu: 1 }).then((result) => { console.log('Submenu:', result); });
