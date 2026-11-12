const crypto = require('crypto');
const orderModel = require('../models/orderModel');

const findAll = async (filters) => {
    return orderModel.findAll(filters);
};

const findById = async (id) => {
    return orderModel.findById(id);
};

const create = async (payload) => {
    const id = 'ord_' + crypto.randomUUID().slice(0, 8);
    return orderModel.create({ id, ...payload });
};

const update = async (id, payload) => {
    const existing = await orderModel.findById(id);
    if (!existing) {
        const error = new Error('Order not found');
        error.status = 404;
        throw error;
    }
    return orderModel.update(id, payload);
};

const deleteItem = async (id) => {
    return orderModel.delete(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteItem,
};
