const express = require('express')
const router = express.Router()
const { register, login, createEmployee } = require('../controllers/UserControllerRel')
const { authenticate, authorize } = require('../middlewares/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.post('/employes', authenticate, authorize('admin'), createEmployee)

//Route protégée
router.get('/profile', authenticate, (req, res) => {
  res.json({message:'Bienvenue dans ton espace sécurisé', user: req.user})
})

module.exports = router
