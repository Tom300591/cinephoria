require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./database/postgre');
const connectMongo = require('./database/mongo');

const app = express();                   

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({message: `Bienvenue sur l'API Cinéphoria-backend`})
})

const userRoutesRelational = require('./routes/UserRoutesRel');
app.use('/api/users-rel', userRoutesRelational);

const filmRoutes = require('./routes/FilmRoutesRel')
app.use('/api/films', filmRoutes)

const salleRoutes = require('./routes/SalleRoutesRel');
app.use('/api/salles', salleRoutes)

const seanceRoutes = require('./routes/SeanceRoutesRel');
app.use('/api/seances', seanceRoutes);

const reservationRoutes = require('./routes/ReservationRoutesRel');
app.use('/api/reservations', reservationRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Démarrage serveur
const port = process.env.PORT || 3000;
app.listen(port,'0.0.0.0', () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

//Relations
const Film = require('./models/Film');
const Salle = require('./models/Salle');
const Seance = require('./models/Seance.js');
const Reservation = require('./models/Reservation');
const User = require('./models/UserRel');

Film.hasMany(Seance, { foreignKey: 'filmId' });
Salle.hasMany(Seance, { foreignKey: 'salleId' });
Seance.belongsTo(Film, { foreignKey: 'filmId' });
Seance.belongsTo(Salle, { foreignKey: 'salleId' });

Seance.hasMany(Reservation, { foreignKey: 'seanceId' });
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(Seance, { foreignKey: 'seanceId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

// Connexions BDD
sequelize.sync().then(() => console.log('Postgre synchronisé'));
connectMongo();

