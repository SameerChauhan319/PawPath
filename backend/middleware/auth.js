const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pawpath_secret_key_2026');

      
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.json({ message: 'User belonging to this token no longer exists' }, 401);
      }

      req.user = user;
      await next();
    } catch (error) {
      console.error('JWT verification error:', error.message);
      return res.json({ message: 'Not authorized, token failed' }, 401);
    }
  }

  if (!token) {
    return res.json({ message: 'Not authorized, no token provided' }, 401);
  }
};
const adminOnly = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    await next();
  } else {
    return res.json({ message: 'Not authorized as an admin' }, 403);
  }
};

module.exports = { protect, adminOnly };
