require('dotenv').config()
const JWT = require('jsonwebtoken')

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou mal formé' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token reçu:', token);
  console.log('Secret utilisé:', process.env.JWT_SECRET);

  try {
    console.log("Token reçu :", token);
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
    console.log("Rôle reçu :", req.user)
    if (!req.user) {
      return res.status(401).json({message:'Non authentifié'})
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({message:'Accès interdit : rôle insuffisant'})
    }
    next()
  }
}

