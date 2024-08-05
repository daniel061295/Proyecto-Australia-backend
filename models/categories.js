/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class CategoryModel extends Model {
  static async getAll() {
    try {
      const categories = await this.findAll({ raw: true });
      return { status: true, categories };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const category = await this.findByPk(id, { raw: true });
      if (category !== null) return { status: true, category };
      return { status: false, message: 'Category not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const { nameCategory } = input;
    try {
      const category = await this.create({ name_category: nameCategory });
      const plainCategory = category.get({ plain: true });
      return { status: true, category: plainCategory };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const { nameCategory } = input;
    try {
      await this.update({ name_category: nameCategory }, { where: { id_category: id } });
      const { status, category, message } = await this.getById({ id });
      if (status) { return { status, category }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { id_category: id } });
      return { status: true, message: 'Category deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
CategoryModel.init(

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
