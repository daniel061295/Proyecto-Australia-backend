/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class MeetingModel extends Model {
  static async getAll() {
    try {
      const meetings = await this.findAll({ raw: true });
      return { status: true, meetings };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ id }) {
    try {
      const meeting = await this.findByPk(id, { raw: true });
      if (meeting !== null) return { status: true, meeting };
      return { status: false, message: 'Meeting not found!' };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async createNew({ input }) {
    const {
      dateTimeMeeting,
      stateId,
      clientId,
      serviceId
    } = input;
    try {
      const meeting = await this.create({
        date_time_meeting: dateTimeMeeting,
        state_id: stateId,
        client_id: clientId,
        service_id: serviceId
      });
      const plainMeeting = meeting.get({ plain: true });
      return { status: true, meeting: plainMeeting };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async updateByPk({ id, input }) {
    const {
      dateTimeMeeting,
      stateId,
      clientId,
      serviceId
    } = input;
    try {
      await this.update({
        id_meeting: id,
        date_time_meeting: dateTimeMeeting,
        state_id: stateId,
        client_id: clientId,
        service_id: serviceId
      }, { where: { id_meeting: id } });
      const { status, meeting, message } = await this.getById({ id });
      if (status) { return { status, meeting }; }
      return { status, message };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ id }) {
    try {
      await this.destroy({ where: { id_meeting: id } });
      return { status: true, message: 'Meeting deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
MeetingModel.init(

  {
    id_meeting: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date_time_meeting: {
      type: DataTypes.DATE,
      allowNull: false
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Meeting'
  }
);
