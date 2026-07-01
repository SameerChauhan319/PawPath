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
    return res.json({ success: false, message: 'Please provide name, email, and password' }, 400);
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.json({ success: false, message: 'Please enter a valid email address' }, 400);
  }

  if (password.length < 6) {
    return res.json({ success: false, message: 'Password must be at least 6 characters long' }, 400);
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: 'An account with this email already exists' }, 400);
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
        success: true,
        message: 'Registration successful',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id, user.role)
        }
      }, 201);
    } else {
      return res.json({ success: false, message: 'Invalid user data received' }, 400);
    }
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Please provide email and password' }, 400);
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id, user.role)
        }
      });
    } else {
      return res.json({ success: false, message: 'Invalid email or password credentials' }, 401);
    }
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      return res.json({
        success: true,
        message: 'User profile fetched successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      return res.json({ success: false, message: 'User profile not found' }, 404);
    }
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (email && email !== user.email) {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          return res.json({ success: false, message: 'Please enter a valid email address' }, 400);
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.json({ success: false, message: 'An account with this email already exists' }, 400);
        }
        user.email = email;
      }

      user.name = name || user.name;

      if (password) {
        if (password.length < 6) {
          return res.json({ success: false, message: 'Password must be at least 6 characters long' }, 400);
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await user.save();

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          token: generateToken(updatedUser._id, updatedUser.role)
        }
      });
    } else {
      return res.json({ success: false, message: 'User not found' }, 404);
    }
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};
