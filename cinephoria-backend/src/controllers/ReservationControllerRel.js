// controllers/ReservationController.js
const Reservation = require('../models/Reservation');

// GET toutes les réservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error("Erreur getAllReservations :", error.message);
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};

// GET une réservation par ID
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);
    if (!reservation) return res.status(404).json({ message: 'Réservation introuvable' });
    res.json(reservation);
  } catch (error) {
    console.error("Erreur getReservationById :", error.message);
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};

const Reservation = require('../models/Reservation');
const Seance = require('../models/Seance');
const Salle = require('../models/Salle');

//Créer une réservation
exports.addReservation = async (req, res) => {
  try {
    const { userId, seanceId, nbPlaces } = req.body;

    // Vérifie que la séance existe avec la salle associée
    const seance = await Seance.findByPk(seanceId, { include: Salle });
    if (!seance) return res.status(404).json({ message: 'Séance introuvable' });

    const salle = seance.Salle;
    if (!salle) return res.status(500).json({ message: 'Aucune salle liée à cette séance' });

    // Vérifie si l'utilisateur a déjà une réservation pour cette séance
    const dejaReserve = await Reservation.findOne({ where: { userId, seanceId } });
    if (dejaReserve) {
      return res.status(409).json({ message: 'Vous avez déjà une réservation pour cette séance.' });
    }

    // Calcule le total des places déjà réservées
    const reservationsExistantes = await Reservation.findAll({ where: { seanceId } });
    const totalReserve = reservationsExistantes.reduce((acc, r) => acc + r.nbPlaces, 0);

    const placesRestantes = salle.capacite - totalReserve;

    if (nbPlaces > placesRestantes) {
      return res.status(400).json({ message: `Plus que ${placesRestantes} place(s) disponible(s) pour cette séance.` });
    }

    // Création de la réservation
    const nouvelleReservation = await Reservation.create({ userId, seanceId, nbPlaces });
    res.status(201).json(nouvelleReservation);

  } catch (error) {
    console.error("Erreur addReservation :", error.message);
    res.status(400).json({ message: "Erreur à la création de la réservation", erreur: error.message });
  }
};


// PUT modifier une réservation
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Reservation.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Réservation introuvable' });
    const reservation = await Reservation.findByPk(id);
    res.json(reservation);
  } catch (error) {
    console.error("Erreur updateReservation :", error.message);
    res.status(400).json({ message: "Erreur à la modification de la réservation", erreur: error.message });
  }
};

// DELETE supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reservation.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Réservation introuvable' });
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    console.error("Erreur deleteReservation :", error.message);
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};
