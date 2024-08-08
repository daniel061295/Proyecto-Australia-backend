/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

export class StateModel extends Model {
  static async getAll() {
    try {
      const states = await this.findAll({ raw: true });
      return { status: true, result: states };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const state = await this.findByPk(id, { raw: true });
      if (state !== null) return { status: true, result: state };
      return { status: false, message: 'State not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const {
      nameState,
      applyForService
    } = input;
    try {
      const state = await this.create({
        nameState,
        applyForService
      });
      const plainState = state.get({ plain: true });
      return { status: true, result: plainState };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const {
      nameState,
      applyForService
    } = input;
    try {
      await this.update({
        nameState,
        applyForService
      }, { where: { idState: id } });
      const { status, result, message } = await this.getById({ id });
      if (status) { return { status, result }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { idState: id } });
      return { status: true, message: 'State deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
StateModel.init(

  {
    idState: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    applyForService: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'States',
    underscored: true
  }
);
