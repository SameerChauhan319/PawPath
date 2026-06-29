const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'pawpath_secret_key_2026',
    { expiresIn: '30d' }
  );
};



const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.json({ message: 'Please provide name, email and password' }, 400);
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: 'User already exists' }, 400);
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user'
    });

    if (user) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
      }, 201);
    } else {
      return res.json({ message: 'Invalid user data' }, 400);
    }
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: 'Please provide email and password' }, 400);
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
      });
    } else {
      return res.json({ message: 'Invalid email or password' }, 401);
    }
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};



const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      return res.json({ message: 'User not found' }, 404);
    }
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};



const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      return res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser._id, updatedUser.role)
      });
    } else {
      return res.json({ message: 'User not found' }, 404);
    }
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};
