const jwt = require('jsonwebtoken');

// Clave secreta para firmar el token (en producción se guarda en variables de entorno .env)
const JWT_SECRET = 'secreto_super_seguro_123';

exports.login = (req, res) => {
    // 1. Extraer las credenciales enviadas en el cuerpo de la petición (POST)
    const { username, password } = req.body;

    // 2. Validar que las credenciales coincidan (según index.html: admin / 1234)
    if (username === 'admin' && password === '1234') {
        
        // 3. Crear el Token (JWT) firmando información no sensible (ej: username)
        // Pista: jwt.sign({ payload }, secreto, { expiresIn: '15m' })
        const token = jwt.sign(
            { username: username, role: 'administrator' },
            JWT_SECRET,
            { expiresIn: '1h' } // Expira en 1 hora por seguridad
        );

        // 4. Configurar la Cookie Segura con HttpOnly en la respuesta (res)
        // Pista: res.cookie('nombre_cookie', valor, { opciones })
        res.cookie('session_token', token, {
            httpOnly: true,       // Protege contra robo de tokens vía XSS
            secure: true,         // Obliga a que viaje solo por HTTPS (canal seguro)
            sameSite: 'strict',   // Mitiga riesgos de ataques CSRF
            maxAge: 3600000       // Duración de 1 hora en milisegundos
        });

        // 5. Enviar la respuesta JSON con el JWT para que el frontend lo guarde en sessionStorage
        return res.status(200).json({
            success: true,
            message: "Autenticación exitosa",
            token: token // El frontend provisto tomará este token de aquí
        });

    } else {
        // 6. Si fallan las credenciales, responder de manera controlada para no dar pistas
        // Buenas prácticas: Enviar un mensaje genérico ("Credenciales incorrectas")
        return res.status(401).json({
            success: false,
            message: "Usuario o contraseña inválidos"
        });
    }
};