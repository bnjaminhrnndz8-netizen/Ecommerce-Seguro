const express = require('express');
const router = express.Router();

// Importamos el controlador usando la sintaxis CommonJS (require)
const productoController = require('../controllers/productoController');

// Asociamos el verbo HTTP GET de la ruta pública '/productos' al controlador
router.get('/productos', productoController.obtenerProductos);

// Exportamos el enrutador usando CommonJS para que 'server.js' lo lea perfectamente
module.exports = router;