const express = require('express')
const router = express.Router()
const {
  getAllSalles,
  addSalle,
  updateSalle,
  deleteSalle,
} = require('../controllers/SalleControllerRel')

const { authenticate, authorize } = require('../middlewares/authMiddleware')

router.get('/', getAllSalles)
router.post('/', authenticate, authorize('admin', 'employe'), addSalle)
router.put('/:id', authenticate, authorize('admin', 'employe'), updateSalle)
router.delete('/:id', authenticate, authorize('admin'), deleteSalle)

module.exports = router