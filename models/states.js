/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class State extends Model {
  static async getAll() {
    try {
      const states = await this.findAll({ raw: true });
      return { status: true, states };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ idState }) {
    try {
      const state = await this.findByPk(idState, { raw: true });
      return { status: true, state };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async post({ nameState, applyForService }) {
    try {
      const state = await this.create({
        name_state: nameState,
        apply_for_service: applyForService
      });
      const plainState = state.get({ plain: true });
      return { status: true, state: plainState };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async put({ idState, nameState, applyForService }) {
    try {
      await this.update({
        name_state: nameState,
        apply_for_service: applyForService
      }, { where: { id_state: idState } });
      const { status, state } = await this.getById({ idState });
      return { status, state };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ idState }) {
    try {
      await this.destroy({ where: { id_state: idState } });
      return { status: true, message: 'State deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
State.init(

  {
    id_state: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apply_for_service: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'State'
  }
);

// test post
// State.post({
//   nameState: 'blobState',
//   applyForService: 1
// }).then((result) => { console.log('State:', result); });

// test getAll
// State.getAll().then((result) => { console.log('State:', result); });

// test getById
// State.getById({ idState: 1 }).then((result) => { console.log('State:', result); });

// test put
// State.put({
//   idState: 1,
//   nameState: 'newBlobState',
//   apply_for_service: 1
// }).then((result) => { console.log('State:', result); });

// test delete
// State.delete({ idState: 1 }).then((result) => { console.log('State:', result); });
