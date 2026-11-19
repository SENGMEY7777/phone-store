const Phone = require('../models/Phone');

const phoneService = {
  getAllPhones: async () => {
    return await Phone.findAll();
  },
  getPhoneById: async (id) => {
    return await Phone.findByPk(id);
  },
  createPhone: async (data) => {
    return await Phone.create(data);
  }
};

module.exports = phoneService;
