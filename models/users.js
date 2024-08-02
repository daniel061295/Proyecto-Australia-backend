/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class User extends Model {
  static async getAll() {
    try {
      const users = await this.findAll({ raw: true });
      return { status: true, users };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ idUser }) {
    try {
      const user = await this.findByPk(idUser, { raw: true });
      return { status: true, user };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async post({ nameUser, passwordUser, emailUser, tokenUser, profileId }) {
    try {
      const user = await this.create({
        name_user: nameUser,
        password_user: passwordUser,
        email_user: emailUser,
        token_user: tokenUser,
        profile_id: profileId
      });
      const plainUser = user.get({ plain: true });
      return { status: true, user: plainUser };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async put({ idUser, nameUser, passwordUser, emailUser, tokenUser, profileId }) {
    try {
      await this.update({
        name_user: nameUser,
        password_user: passwordUser,
        email_user: emailUser,
        token_user: tokenUser,
        profile_id: profileId
      }, { where: { id_user: idUser } });
      const { status, user } = await this.getById({ idUser });
      return { status, user };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ idUser }) {
    try {
      await this.destroy({ where: { id_user: idUser } });
      return { status: true, message: 'User deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
User.init(
  {
    id_user: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_user: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email_user: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    token_user: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

// // test post
User.post({
  nameUser: 'blobUser',
  passwordUser: 'blobUserPassword',
  emailUser: 'blobUserEmail',
  tokenUser: 'blobUserToken',
  profileId: 1
}).then((result) => { console.log('User:', result); });

// test getAll
// User.getAll().then((result) => { console.log('User:', result); });

// test getById
// User.getById({ idUser: 1 }).then((result) => { console.log('User:', result); });

// test put
// User.put({
//   idUser: 1,
//   nameUser: 'newBlobUser',
//   menuId: 1
// }).then((result) => { console.log('User:', result); });

// test delete
// User.delete({ idUser: 1 }).then((result) => { console.log('User:', result); });
