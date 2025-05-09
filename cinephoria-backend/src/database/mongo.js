const mongoose = require('mongoose')
require('dotenv').config()

const connectMongo = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connecté')
  } catch (error) {
    console.error(`Erreur MongoDB :`, error.message)
    process.exit(1)
  }
}

module.exports = connectMongo