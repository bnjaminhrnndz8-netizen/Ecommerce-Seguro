const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Asociamos el verbo POST a la ruta '/login' con la función correspondiente
router.post('/login', authController.login);

module.exports = router;