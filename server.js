// 1. Importación de módulos requeridos
const express = require('express');
const https = require('https');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const path = require('path');

// 2. Importación de Rutas del Patrón MVC
const productoRoutes = require('./src/routes/productoRoutes');

// 3. Inicialización de la aplicación Express
const app = express();

// 4. Middlewares globales
// Permite leer cuerpos de peticiones en formato JSON
app.use(express.json());
// Permite que Express pueda analizar y leer cookies seguras en las peticiones entrantes
app.use(cookieParser());

// Servir archivos estáticos (por si index.html requiere recursos CSS/JS locales)
app.use(express.static(path.join(__dirname)));

// 5. Enlace de Rutas al Servidor
// Las rutas de productos se servirán bajo el prefijo '/api' para mantener la API ordenada (ej: https://localhost:8443/api/productos)
app.use('/api', productoRoutes);

// Servir el archivo frontend "index.html" de forma estática cuando se acceda a la raíz "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 6. Configuración de credenciales HTTPS (SSL/TLS)
// Leemos de forma síncrona los certificados generados con OpenSSL en la carpeta certs/
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'servidor.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'servidor.cer'))
};

// 7. Puerto de escucha seguro (8443)
const PORT = 8443;

// 8. Creación e inicio del servidor seguro HTTPS
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`[Seguridad] Servidor HTTPS iniciado exitosamente en MVC.`);
    console.log(`[Enlace] Accede de forma segura en: https://localhost:${PORT}`);
    console.log(`================================================================`);
});
``