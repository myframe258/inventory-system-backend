const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// POST /api/inventory/withdraw
router.post('/withdraw', inventoryController.withdrawItem);

module.exports = router;