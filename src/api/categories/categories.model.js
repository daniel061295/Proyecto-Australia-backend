/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

export class CategoryModel extends Model {
  static async getAll() {
    try {
      const categories = await this.findAll({ raw: true });
      return { status: true, result: categories };
    } catch (error) {
      return { status: false, result: error };
    }
  }

  static async getById({ id }) {
    try {
      const category = await this.findByPk(id, { raw: true });
      if (category !== null) return { status: true, result: category };
      return { status: false, message: 'Category not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const { nameCategory, imageUrlCategory } = input;
    try {
      const category = await this.create({ nameCategory, imageUrlCategory });
      const plainCategory = category.get({ plain: true });
      return { status: true, result: plainCategory };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const { nameCategory, imageUrlCategory } = input;
    try {
      await this.update({ nameCategory, imageUrlCategory }, { where: { idCategory: id } });
      const { status, result, message } = await this.getById({ id });
      if (status) { return { status, result }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { idCategory: id } });
      return { status: true, message: 'Category deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
CategoryModel.init(

  {
    idCategory: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true

    },
    nameCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrlCategory: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Categories',
    underscored: true
  }
);
