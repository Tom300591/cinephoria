const Salle = require('../models/Salle')

//GET toutes les salles
exports.getAllSalles = async (req, res) => {
  try {
    const salles = await Salle.findAll()
    res.json(salles)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message })
  }
}

//POST Créer une salle
exports.addSalle = async (req, res) => {
  try {
    const { nom, capacite, accessibilite, qualite } = req.body
    const salle = await Salle.create({ nom, capacite, accessibilite, qualite })
    res.status(201).json(salle)
  } catch (error) {
    res.status(400).json({ message: 'Erreur à la création', erreur: error.message })
  }
}

//PUT Modifier une salle
exports.updateSalle = async (req, res) => {
  try {
    const { id } = req.params
    console.log("Tentative de mise à jour pour la salle ID :", id)
    const [updatedCount] = await Salle.update(req.body, { where: { id } })
    if (updatedCount === 0) return res.status(404).json({ message: 'Salle Introuvable' })
    
    const salle = await Salle.findByPk(id)
    res.json(salle)
  } catch (error) {
    res.status(400).json({ message: 'Erreur à la modification', erreur: error.message })
  }
}

//DELETE Supprimer une salle
exports.deleteSalle = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Salle.destroy({ where: { id } })
    if (!deleted) return res.status(404).json({ message: 'Salle introuvable' })
    
    res.json({ message: 'Salle supprimée' })
  } catch (erreur) {
    res.status(500).json({ message: 'Erreur serveur', erreur: error.message })
  }
}