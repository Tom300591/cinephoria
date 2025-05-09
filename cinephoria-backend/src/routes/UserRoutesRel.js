const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/UserControllerRel')
const { authenticate } = require('../middlewares/authMiddleware')

router.post('/register', register)
router.post('/login', login)

//Route protégée
router.get('/profile', authenticate, (req, res) => {
  res.json({message:'Bienvenue dans ton espace sécurisé', user: req.user})
})

module.exports = router