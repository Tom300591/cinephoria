const express = require('express');
const router = express.Router();
const { getAllSeances, getSeanceById, addSeance, updateSeance, deleteSeance } = require('../controllers/SeanceController');
const { authenticate, authorize } = require('../middlewares/authMiddleware')

router.get('/', getAllSeances);
router.get('/:id', getSeanceById);
router.post('/',authenticate, authorize('admin', 'employe'), addSeance);
router.put('/:id',authenticate, authorize('admin', 'employe'), updateSeance);
router.delete('/:id',authenticate, authorize('admin', 'employe'), deleteSeance);

module.exports = router;
