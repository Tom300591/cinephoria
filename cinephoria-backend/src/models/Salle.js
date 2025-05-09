const { DataTypes } = require('sequelize')
const sequelize = require('../database/postgre')

const Salle = sequelize.define('Salle', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  accessibilite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  qualite: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = Salle