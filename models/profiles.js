/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Profile extends Model {
  static async getAll() {
    try {
      const profiles = await this.findAll({ raw: true });
      return { status: true, profiles };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ idProfile }) {
    try {
      const profile = await this.findByPk(idProfile, { raw: true });
      return { status: true, profile };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async post({ nameProfile }) {
    try {
      const profile = await this.create({ name_profile: nameProfile });
      const plainProfile = profile.get({ plain: true });
      return { status: true, profile: plainProfile };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async put({ idProfile, nameProfile }) {
    try {
      await this.update({ name_profile: nameProfile }, { where: { id_profile: idProfile } });
      const { status, profile } = await this.getById({ idProfile });
      return { status, profile };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ idProfile }) {
    try {
      await this.destroy({ where: { id_profile: idProfile } });
      return { status: true, message: 'Profile deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
Profile.init(

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

// // test post
// Profile.post({
//   nameProfile: 'blobProfile'
// }).then((result) => { console.log('Profile:', result); });

// test getAll
// Profile.getAll().then((result) => { console.log('Profile:', result); });

// test getById
// Profile.getById({ idProfile: 1 }).then((result) => { console.log('Profile:', result); });

// test put
// Profile.put({
//   idProfile: 1,
//   nameProfile: 'newBlobProfile'
// }).then((result) => { console.log('Profile:', result); });

// test delete
// Profile.delete({ idProfile: 1 }).then((result) => { console.log('Profile:', result); });
