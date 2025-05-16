const { DataTypes } = require('sequelize')
const sequelize = require('../database/postgre')

const Film = sequelize.define('Film', {
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  affiche: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
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
  coupDeCoeur: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  note: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
}, {
  tableName: 'Films'
})

module.exports = Film