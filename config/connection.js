const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.user_db,
  process.env.root,
  process.env.root,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 8080,
  }
);

module.exports = sequelize;
