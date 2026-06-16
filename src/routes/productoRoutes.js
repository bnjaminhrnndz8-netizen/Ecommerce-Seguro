const express = require('express');
const router = express.Router();

// Importamos el controlador que contiene la lógica para manejar la petición
const productoController = require('../controllers/productoController');

// Asociamos el verbo HTTP GET de la ruta pública '/productos' al controlador
router.get('/productos', productoController.obtenerProductos);

// Exportamos el enrutador para integrarlo en el servidor principal (server.js)
module.exports = router;