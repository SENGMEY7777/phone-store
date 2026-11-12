const crypto = require('crypto');
const phoneModel = require('../models/phoneModel');

const findAll = async (filters) => {
    return phoneModel.findAll(filters);
};

const findById = async (id) => {
    return phoneModel.findById(id);
};

const create = async (payload) => {
    const id = 'pho_' + crypto.randomUUID().slice(0, 8);
    return phoneModel.create({ id, ...payload });
};

const update = async (id, payload) => {
    const existing = await phoneModel.findById(id);
    if (!existing) {
        const error = new Error('Phone not found');
        error.status = 404;
        throw error;
    }
    return phoneModel.update(id, payload);
};

const deleteItem = async (id) => {
    return phoneModel.delete(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteItem,
};
