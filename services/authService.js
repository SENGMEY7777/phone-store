const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userModel = require('../models/userModel');
const env = require('../configs/env');

const register = async ({ name, email, password, role = 'customer' }) => {
    const existing = await userModel.findByEmail(email);
    if (existing) {
        const err = new Error('Email is already registered');
        err.status = 409;
        throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = 'usr_' + crypto.randomUUID().slice(0, 8);
    const user = await userModel.create({
        id: userId,
        name,
        email,
        password: hashedPassword,
        role,
    });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwt.secret, {
        expiresIn: env.jwt.expiresIn,
    });
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};

const login = async ({ email, password }) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwt.secret, {
        expiresIn: env.jwt.expiresIn,
    });
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};

const getProfile = async (id) => {
    return userModel.findById(id);
};

const getAllUsers = async () => {
    return userModel.findAll();
};

module.exports = {
    register,
    login,
    getProfile,
    getAllUsers,
};
