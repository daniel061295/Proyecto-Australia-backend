import { Sequelize } from 'sequelize';
import { DATABASE_NAME, USERNAME_DB, PASSWORD_DB, HOSTNAME_DB, PORT_DB, DIALECT_DB } from '../config.js';

export const sequelize = new Sequelize(DATABASE_NAME, USERNAME_DB, PASSWORD_DB, {
  host: HOSTNAME_DB,
  dialect: DIALECT_DB,
  port: PORT_DB,
  logging: false,
  define: {
    timestamps: false
  }
});

// Sincronizar los modelos automáticamente
export const initializeDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // 'alter' ajusta las tablas existentes sin perder datos
    console.log('Base de datos sincronizada con los modelos.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};