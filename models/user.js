// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Make sure to set up sequelize instance

const User = sequelize.define('User', {
  // Define user schema
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
