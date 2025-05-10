require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/UserRel')

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role, prenom: user.prenom, nom: user.nom, email: user.email, pseudo: user.pseudo }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

exports.register = async (req, res) => {
  try {
    const { login, password, nom, prenom } = req.body
    
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/
    if (!regex.test(password)) return res.status(400).json({ message: 'Mot de passe non conforme' })
    
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ login, password: hashed, nom, prenom })
    
    res.status(201).json({message: 'Utilisateur créeé', user})
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

exports.login = async (req, res) => {
  
  try {
    const { login, password } = req.body

    const user = await User.findOne({ where: { login } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants incorrects' })
    }

    const token = generateToken(user)
    res.json({ token, role: user.role })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', erreur: error.message })
  }
}

exports.createEmployee = async (req, res) => {
    const { login, password, nom, prenom } = req.body
    
    if (!login || !password || !nom || !prenom) {
      return res.status(400).json({ message: `Tous les champs (login, password, nom, prénom) sont requis.` })
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const newEmployee = await User.create({ login, password: hashedPassword, nom, prenom, role: 'employe' })
      const { password: _, ...userSansPassword } = newEmployee.toJSON()
res.status(201).json({ message: `Employé créé`, user: userSansPassword })
    } catch (error) {
      res.status(500).json({ message: `Erreur lors de la création`, error })
    }
  }
