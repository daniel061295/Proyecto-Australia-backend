/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class StateModel extends Model {
  static async getAll() {
    try {
      const states = await this.findAll({ raw: true });
      return { status: true, states };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const state = await this.findByPk(id, { raw: true });
      if (state !== null) return { status: true, state };
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
        name_state: nameState,
        apply_for_service: applyForService
      });
      const plainState = state.get({ plain: true });
      return { status: true, state: plainState };
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
        name_state: nameState,
        apply_for_service: applyForService
      }, { where: { id_state: id } });
      const { status, state, message } = await this.getById({ id });
      if (status) { return { status, state }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { id_state: id } });
      return { status: true, message: 'State deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
StateModel.init(

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
