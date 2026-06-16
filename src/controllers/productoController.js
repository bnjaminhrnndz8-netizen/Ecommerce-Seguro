// Importamos los datos seguros desde nuestro modelo
const productos = require('../models/productoModel');

// Función que captura los productos y los devuelve en formato JSON estructurado
exports.obtenerProductos = (req, res) => {
    try {
        // Retornamos el array con código HTTP 200 (Éxito)
        res.status(200).json(productos);
    } catch (error) {
        // En ciberseguridad es vital no filtrar detalles de errores internos al cliente (Information Disclosure)
        // Por ende, enviamos un mensaje genérico controlado
        res.status(500).json({ error: "Error interno al recuperar los productos." });
    }
};