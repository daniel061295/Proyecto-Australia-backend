/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class ProfileModel extends Model {
  static async getAll() {
    try {
      const profiles = await this.findAll({ raw: true });
      return { status: true, profiles };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const profile = await this.findByPk(id, { raw: true });
      if (profile !== null) return { status: true, profile };
      return { status: false, message: 'Profile not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const { nameProfile } = input;
    try {
      const profile = await this.create({ name_profile: nameProfile });
      const plainProfile = profile.get({ plain: true });
      return { status: true, profile: plainProfile };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const { nameProfile } = input;
    try {
      await this.update({ name_profile: nameProfile }, { where: { id_profile: id } });
      const { status, profile, message } = await this.getById({ id });
      if (status) { return { status, profile }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { id_profile: id } });
      return { status: true, message: 'Profile deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
ProfileModel.init(

  {
    id_profile: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_profile: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Profile'
  }
);
