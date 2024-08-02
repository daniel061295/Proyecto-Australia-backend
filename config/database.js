import { Sequelize } from 'sequelize';
import { readJSON } from '../utils.js';

const dbInfo = readJSON('./config/settings.json');

const { database, username, password, hostname, port, dialect } = dbInfo;

export const sequelize = new Sequelize(database, username, password, {
  host: hostname,
  dialect,
  port,
  logging: false,
  define: {
    timestamps: false
  }
});
