const db = require('../config/database');
const Brand = require('./Brand');
const Customer = require('./Customer');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Phone = require('./Phone');
const PhoneVariant = require('./PhoneVariant');
const User = require('./User');

module.exports = {
  db,
  Brand,
  Customer,
  Order,
  OrderItem,
  Phone,
  PhoneVariant,
  User
};