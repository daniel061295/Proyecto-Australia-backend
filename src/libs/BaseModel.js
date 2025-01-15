/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';

export class BaseModel extends Model {
  static async getAll() {
    try {
      const records = await this.findAll({ raw: true });
      return { status: true, result: records };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  static async getById({ id }) {
    try {
      const record = await this.findByPk(id, { raw: true });
      if (record) return { status: true, result: record };
      return { status: false, message: 'Record not found!' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  static async createNew({ input }) {
    try {
      const record = await this.create(input);
      const plainRecord = record.get({ plain: true });
      return { status: true, result: plainRecord };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  static async updateByPk({ id, input }) {
    try {
      const updatedCount = await this.update(input, { where: { id } });
      if (updatedCount[0] === 0) return { status: false, message: 'Record not found or no changes made.' };
      const updatedRecord = await this.getById({ id });
      return updatedRecord;
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  static async delete({ id }) {
    try {
      const deletedCount = await this.destroy({ where: { id } });
      if (deletedCount === 0) return { status: false, message: 'Record not found!' };
      return { status: true, message: 'Record deleted successfully' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}