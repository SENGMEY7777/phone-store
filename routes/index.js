const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const brandRoutes = require('./brandRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const orderRoutes = require('./orderRoutes');
const phoneRoutes = require('./phoneRoutes');
const reportRoutes = require('./reportRoutes');

router.use('/auth', authRoutes);
router.use('/brands', brandRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/orders', orderRoutes);
router.use('/phones', phoneRoutes);
router.use('/reports', reportRoutes);

router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;