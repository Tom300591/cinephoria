const { response } = require("express");
const Film = require("../models/Film");

//Obtenir tous les films
exports.getAllFilms = async (req, res) => {
  try {
    const films = await Film.findAll();
    res.json(films);
  } catch (error) {
    console.error("Erreur getAllFilms:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//Ajouter des films
exports.addFilm = async (req, res) => {
  try {
    const { titre, genre, description, duree, ageMinimum, labelCoupDeCoeur } =
      req.body;

    const newfilm = await Film.create({
      titre,
      genre,
      description,
      duree,
      ageMinimum,
      labelCoupDeCoeur,
    });
    res.status(201).json(newfilm);
  } catch (error) {
    console.error("Erreur addFilm:", error.message);
    res.status(400).json({ message: "Errur lors de l'ajout du film" });
  }
};

//Modifier un film
exports.updateFilm = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Film.update(req.body, { where: { id } })
    
    if (updated[0] === 0) return res.status(404).json({ message: 'Film introuvable' })
    
    const film = await Film.findByPk(id)
    res.json(film)
  } catch (error) {
    res.status(400).json({message:'Erreur à la modification', erreur:error.message})
  }
}

//Supprimer un film
exports.deleteFilm = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Film.destroy({ where: { id } })
    
    if (!deleted) return res.status(404).json({ message: 'Film introuvable' })
    
    res.json({ message: 'Film supprimer avec succès' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message })
  }
}