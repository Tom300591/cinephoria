const { DataTypes } = require('sequelize')
const sequelize = require('../database/postgre')

const User = sequelize.define('User', {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('utilisateur', 'employe', 'admin'),
    defaultValue: 'utilisateur'
  },
  mustChangePassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

module.exports = User