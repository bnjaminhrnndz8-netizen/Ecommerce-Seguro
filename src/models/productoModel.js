// Definimos un conjunto seguro de datos de ejemplo locales (Productos del e-commerce)
// En producción, aquí se realizarían las consultas sanitizadas a la Base de Datos para evitar SQL Injection.
const productos = [
    { id: 1, nombre: "Cortafuegos Personal Pro", precio: 29990, descripcion: "Protección avanzada contra accesos no autorizados." },
    { id: 2, nombre: "Licencia Antivirus Premium", precio: 19990, descripcion: "Detección heurística de malware en tiempo real." },
    { id: 3, nombre: "Token de Autenticación USB", precio: 15490, descripcion: "Llave física de doble factor de autenticación (2FA)." },
    { id: 4, nombre: "VPN Cifrada Militar Anual", precio: 45000, descripcion: "Cifrado de túnel de extremo a extremo sin registros." }
];

// Exportamos el modelo para que el controlador pueda utilizarlo
module.exports = productos;