const { DataTypes } = require('sequelize')
const sequelize = require('../database/postgre')

const Film = sequelize.define('Film', {
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ageMinimum: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  labelCoupDeCoeur: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  note: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
}, {
  tableName: 'films'
})

module.exports = Film