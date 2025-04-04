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
    const idColumn = this.primaryKeyAttributes[0]
    try {
      const updatedCount = await this.update(input, { where: { [idColumn]: id } });
      // if (updatedCount[0] === 0) return { status: false, message: 'Record not found or no changes made.' };
      const updatedRecord = await this.getById({ id });
      return updatedRecord;
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  static async delete({ id }) {
    try {
      const idColumn = this.primaryKeyAttributes[0]
      const deletedCount = await this.destroy({ where: { [idColumn]: id } });
      if (deletedCount === 0) return { status: false, message: 'Record not found!' };
      return { status: true, message: 'Record deleted successfully' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  static async getByFilter({ column, id }) {
    const attributes = await this.getAttributes();
    if (!attributes[column]) {
      return { status: false, message: `The column '${column}' does not exist` };
    }
    try {
      const record = await this.findAll({
        where: { [column]: id },

      });
      if (record.length > 0) return { status: true, result: record };
      return { status: false, message: `No meetings found for the specified ${column}!` };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}