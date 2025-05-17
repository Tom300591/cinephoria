const { Sequelize } = require('sequelize')

const isProd = process.env.NODE_ENV === 'production';

const sequelize = isProd
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize(
      process.env.POSTGRE_DB,
      process.env.POSTGRE_USER,
      process.env.POSTGRE_PASSWORD,
      {
        host: process.env.POSTGRE_HOST,
        port: process.env.POSTGRE_PORT || 5432,
        dialect: 'postgres',
        logging: console.log,
      }
    )

sequelize.authenticate()
  .then(() => console.log('Connexion PostgreSQL OK'))
  .catch(err => console.error('Erreur de connexion PostgreSQL :', err))

console.log('DATABESE_URL ===>', process.env.DATABASE_URL)

module.exports = sequelize
