
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed. Token missing.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'Secret');

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;


    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authenticationMiddleware;
