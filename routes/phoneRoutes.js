const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phoneController');

router.get('/', phoneController.getAll);
router.get('/:id', phoneController.getById);
router.post('/', phoneController.create);
router.put('/:id', phoneController.update);
router.delete('/:id', phoneController.delete);

module.exports = router;
