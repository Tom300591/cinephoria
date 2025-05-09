const express = require('express')
const router = express.Router()
const { getAllFilms, addFilm, updateFilm, deleteFilm } = require('../controllers/FilmControllerRel')
const { authenticate, authorize } = require('../middlewares/authMiddleware')

//GET /api/films : tous les films
router.get('/', getAllFilms)

//Post /api/films : ajouter un film (protégé)
router.post('/', authenticate, authorize('admin', 'employe'), addFilm)
router.put('/:id', authenticate, authorize('admin', 'employe'), updateFilm)
router.delete('/:id', authenticate, authorize('admin'), deleteFilm)

module.exports = router