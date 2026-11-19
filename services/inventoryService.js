const PhoneVariant = require('../models/PhoneVariant');

const inventoryService = {
  getStock: async (variantId) => {
    const variant = await PhoneVariant.findByPk(variantId);
    if (!variant) throw new Error('Variant not found');
    return variant.stock;
  },
  updateStock: async (variantId, quantity) => {
    const variant = await PhoneVariant.findByPk(variantId);
    if (!variant) throw new Error('Variant not found');
    variant.stock = quantity;
    await variant.save();
    return variant;
  }
};

module.exports = inventoryService;
