// 1. Importación de módulos requeridos
const express = require('express');
const https = require('https');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const path = require('path');

// 2. Importación de Rutas del Patrón MVC (Corregido: Sin el .default)
const productoRoutes = require('./src/routes/productoRoutes');
const authRoutes = require('./src/routes/authRoutes');
const checkoutRoutes = require('./src/routes/checkoutRoutes');

// 3. Inicialización de la aplicación Express
const app = express();

// 4. Middlewares globales
// Permite leer cuerpos de peticiones en formato JSON
app.use(express.json());
// Permite que Express pueda analizar y leer cookies seguras en las peticiones entrantes
app.use(cookieParser());

// Servir archivos estáticos (para cargar recursos de index.html)
app.use(express.static(path.join(__dirname)));

// 5. Enlace de Rutas al Servidor
app.use('/api', productoRoutes);
app.use('/api', authRoutes);
app.use('/api', checkoutRoutes);

// Servir el archivo frontend "index.html" de forma estática cuando se acceda a la raíz "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 6. Configuración de credenciales HTTPS (SSL/TLS)
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