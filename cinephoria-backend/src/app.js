require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./database/postgre');
const connectMongo = require('./database/mongo');


const app = express();                   

app.use(cors());
app.use(express.json());

// Connexions BDD
sequelize.sync().then(() => console.log('Postgre synchronisé'));
connectMongo();

// Routes
app.get('/', (req, res) => {
  res.json({message: `Bienvenue sur l'API Cinéphoria`})
})

const userRoutesRelational = require('./routes/UserRoutesRel');
app.use('/api/users-rel', userRoutesRelational);

const filmRoutes = require('./routes/FilmRoutesRel')
app.use('/api/films', filmRoutes)

const salleRoutes = require('./routes/SalleRoutesRel');
app.use('/api/salles', salleRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Démarrage serveur
const port = process.env.PORT || 3000;
app.listen(port,'0.0.0.0', () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
