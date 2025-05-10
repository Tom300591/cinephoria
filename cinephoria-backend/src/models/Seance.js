const { DataTypes } = require('sequelize')
const sequelize = require('../database/postgre')

const Seance = sequelize.define('Seance', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  filmId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  salleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = Seance
