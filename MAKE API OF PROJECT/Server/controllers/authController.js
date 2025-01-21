const jwt = require('jsonwebtoken');
// const User = require('../models/User');
const UserModel = require('../models/userModel');

// Login Controller
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      '02192611', // Replace with a secure key in production
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { loginUser };
