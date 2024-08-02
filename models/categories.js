/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Category extends Model {
  static async getAll() {
    try {
      const categories = await this.findAll({ raw: true });
      return { status: true, categories };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ idCategory }) {
    try {
      const category = await this.findByPk(idCategory, { raw: true });
      return { status: true, category };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async create({ input }) {
    const { nameCategory } = input;
    try {
      const category = await this.create({ name_category: nameCategory });
      const plainCategory = category.get({ plain: true });
      return { status: true, category: plainCategory };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async update({ id, input }) {
    const idCategory = id;
    const { nameCategory } = input;
    try {
      await this.update({ name_category: nameCategory }, { where: { id_category: idCategory } });
      const { status, category } = await this.getById({ idCategory });
      return { status, category };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ idCategory }) {
    try {
      await this.destroy({ where: { id_category: idCategory } });
      return { status: true, message: 'Category deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
Category.init(

  {
    id_category: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Category'
  }
);

// // test create
// Category.create({
//   nameCategory: 'blobCategory'
// }).then((result) => { console.log('Category:', result); });

// test getAll
// Category.getAll().then((result) => { console.log('Category:', result); });

// test getById
// Category.getById({ idClient: 1 }).then((result) => { console.log('Category:', result); });

// test update
// Category.update({
//   idCategory: 1,
//   nameCategory: 'newBlobCategory'
// }).then((result) => { console.log('Category:', result); });

// test delete
// Category.delete({ idCategory: 1 }).then((result) => { console.log('Category:', result); });
