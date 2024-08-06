/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class ProfileModel extends Model {
  static async getAll() {
    try {
      const profiles = await this.findAll({ raw: true });
      return { status: true, result: profiles };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const profile = await this.findByPk(id, { raw: true });
      if (profile !== null) return { status: true, result: profile };
      return { status: false, message: 'Profile not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const { nameProfile } = input;
    try {
      const profile = await this.create({ nameProfile });
      const plainProfile = profile.get({ plain: true });
      return { status: true, result: plainProfile };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const { nameProfile } = input;
    try {
      await this.update({ nameProfile }, { where: { idProfile: id } });
      const { status, result, message } = await this.getById({ id });
      if (status) { return { status, result }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { idProfile: id } });
      return { status: true, message: 'Profile deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
ProfileModel.init(

  {
    idProfile: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameProfile: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Profiles',
    underscored: true
  }
);
