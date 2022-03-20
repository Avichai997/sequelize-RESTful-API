const Sequelize = require('sequelize');
const db = require('../server');

module.exports = db.define(
  'carousel',
  {
    isOperational: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    orderNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    // freezeTableName: true, // keeps the table name as we write it
    // validate: true
  }
);
