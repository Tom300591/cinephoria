const { DataTypes } = require('sequelize')
const sequelize = require('../database/postgre')

const Seance = sequelize.define('Seance', {
  filmId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Films',
      key: 'id',
    },
  },
  salleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Salles',
      key: 'id',
    },
  },
  heureDebut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  heureFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  qualite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Seances',
})

module.exports = Seance
