const Seance = require('../models/Seance');

// GET toutes les séances
exports.getAllSeances = async (req, res) => {
  try {
    const seances = await Seance.findAll(); // fix: findall → findAll
    res.json(seances);
  } catch (error) {
    console.error(`Erreur getAllSeances :`, error.message);
    res.status(500).json({ message: `Erreur serveur`, erreur: error.message }); // fix: ststus → status
  }
};

// GET une séance par ID
exports.getSeanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const seance = await Seance.findByPk(id);
    if (!seance) {
      return res.status(404).json({ message: `Séance non trouvée` });
    }
    res.json(seance);
  } catch (error) {
    console.error(`Erreur getSeanceById :`, error.message);
    res.status(500).json({ message: `Erreur serveur`, erreur: error.message });
  }
};

// POST créer une séance
exports.addSeance = async (req, res) => {
  try {
    const { heureDebut, heureFin, filmId, salleId, qualite } = req.body;

    if (!heureDebut || !heureFin || !filmId || !salleId || !qualite) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const seance = await Seance.create({
      heureDebut,
      heureFin,
      filmId,
      salleId,
      qualite
    });

    res.status(201).json(seance);
  } catch (error) {
    console.error('Erreur addSeance :', error.message);
    res.status(400).json({ message: `Erreur à la création de la séance`, erreur: error.message });
  }
};

// PUT modifier une séance
exports.updateSeance = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Seance.update(req.body, { where: { id } });

    if (!updated) return res.status(404).json({ message: 'Séance introuvable' });

    const seance = await Seance.findByPk(id);
    res.json(seance);
  } catch (error) {
    console.error("Erreur updateSeance :", error.message);
    res.status(400).json({ message: "Erreur à la modification de la séance", erreur: error.message });
  }
};

// DELETE supprimer une séance
exports.deleteSeance = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Seance.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: 'Séance introuvable' });

    res.json({ message: 'Séance supprimée' });
  } catch (error) {
    console.error("Erreur deleteSeance :", error.message);
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message });
  }
};
