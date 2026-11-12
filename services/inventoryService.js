const crypto = require('crypto');
const inventoryModel = require('../models/inventoryModel');

const findAll = async (filters) => {
    return inventoryModel.findAll(filters);
};

const findById = async (id) => {
    return inventoryModel.findById(id);
};

const create = async (payload) => {
    const id = 'inv_' + crypto.randomUUID().slice(0, 8);
    return inventoryModel.create({ id, ...payload });
};

const update = async (id, payload) => {
    const existing = await inventoryModel.findById(id);
    if (!existing) {
        const error = new Error('Inventory not found');
        error.status = 404;
        throw error;
    }
    return inventoryModel.update(id, payload);
};

const deleteItem = async (id) => {
    return inventoryModel.delete(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteItem,
};
