/* eslint-disable space-before-function-paren */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Meeting extends Model {
  static async getAll() {
    try {
      const meetings = await this.findAll({ raw: true });
      return { status: true, meetings };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async getById({ idMeeting }) {
    try {
      const meeting = await this.findByPk(idMeeting, { raw: true });
      return { status: true, meeting };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async post({ dateTimeMeeting, stateId, clientId, serviceId }) {
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

  static async put({ idMeeting, dateTimeMeeting, stateId, clientId, serviceId }) {
    try {
      await this.update({
        id_meeting: idMeeting,
        date_time_meeting: dateTimeMeeting,
        state_id: stateId,
        client_id: clientId,
        service_id: serviceId
      }, { where: { id_meeting: idMeeting } });
      const { status, meeting } = await this.getById({ idMeeting });
      return { status, meeting };
    } catch (error) {
      return { status: false, message: error };
    }
  }

  static async delete({ idMeeting }) {
    try {
      await this.destroy({ where: { id_meeting: idMeeting } });
      return { status: true, message: 'Meeting deleted successfully' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}
Meeting.init(

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

// test post
// Meeting.post({
//   dateTimeMeeting: '2016-05-23 10:39:21',
//   stateId: 1,
//   clientId: 1,
//   serviceId: 1
// }).then((result) => { console.log('Meeting:', result); });

// test getAll
// Meeting.getAll().then((result) => { console.log('Meeting:', result); });

// test getById
// Meeting.getById({ idMeeting: 1 }).then((result) => { console.log('Meeting:', result); });

// test put
// Meeting.put({
//   idMeeting: 2,
//   dateTimeMeeting: '2024-08-02 10:39:21',
//   stateId: 1,
//   clientId: 1,
//   serviceId: 1
// }).then((result) => { console.log('Meeting:', result); });

// test delete
// Meeting.delete({ idMeeting: 2 }).then((result) => { console.log('Meeting:', result); });
