// userController.js

const User = require('../models/user');

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ user });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ user });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

module.exports = {
  getUser,
  updateUser,
};
