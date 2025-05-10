require('dotenv').config()
const JWT = require('jsonwebtoken')

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou mal formé' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token invalide !', error.message);
    return res.status(403).json({ message: 'Token invalide' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({message:'Non authentifié'})
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({message:'Accès interdit : rôle insuffisant'})
    }
    next()
  }
}

