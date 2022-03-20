const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const {
  SQL_HOST,
  SQL_PORT,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DB,
  SQL_DIALECT
} = process.env;

const db = new Sequelize(SQL_DB, SQL_USER, SQL_PASSWORD, {
  host: SQL_HOST,
  port: SQL_PORT,
  dialect: SQL_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
