const express = require('express');
const router = express.Router();

// Importamos el controlador correspondiente
const checkoutController = require('../controllers/checkoutController');

// Asociamos el verbo HTTP POST a la ruta segura /checkout
router.post('/checkout', checkoutController.procesarPago);

module.exports = router;