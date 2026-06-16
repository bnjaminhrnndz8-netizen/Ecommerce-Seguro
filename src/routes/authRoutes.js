const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mapeo del login seguro (POST)
router.post('/login', authController.login);

module.exports = router;