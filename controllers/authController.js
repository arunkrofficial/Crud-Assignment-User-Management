

const User = require('../models/user');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.json({ msg: 'User Registered Successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      res.json({ msg: 'User Login Successfully', user });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  register,
  login,
};
