const { Order, OrderItem } = require('../models');

const orderService = {
  createOrder: async (orderData, items) => {
    const order = await Order.create(orderData);
    for (const item of items) {
      await OrderItem.create({ ...item, orderId: order.id });
    }
    return order;
  },
  getOrderById: async (id) => {
    return await Order.findByPk(id, { include: [OrderItem] });
  }
};

module.exports = orderService;
