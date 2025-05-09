const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.POSTGRE_DB,
  process.env.POSTGRE_USER,
  process.env.POSTGRE_PASSWORD,
  {
    host: process.env.POSTGRE_HOST,
    port: process.env.POSTGRE_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'production' ? false : console.log,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false,
      } : false
    }
  }
)

sequelize.authenticate()
  .then(() => console.log('Connexion PostgreSQL OK'))
  .catch(err => console.error('Erreur de connexion PostgreSQL :', err))

module.exports = sequelize
