const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/postgre');

class Reservation extends Model {}

Reservation.init({
  userId: { type: DataTypes.INTEGER, allowNull: false },
  seanceId: { type: DataTypes.INTEGER, allowNull: false },
  nbPlaces: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'Reservation',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'seanceId']
    }
  ]
});

module.exports = Reservation;
