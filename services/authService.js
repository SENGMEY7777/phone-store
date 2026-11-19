const User = require('../models/User');
const env = require('../config/env');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authService = {
  login: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return { user, token };
  },
  register: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await User.create({ ...userData, password: hashedPassword });
  }
};

module.exports = authService;
