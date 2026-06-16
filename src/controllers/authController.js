// Importaciones requeridas en formato CommonJS
const jwt = require('jsonwebtoken');

// Clave secreta para firmar y validar los tokens criptográficos
const JWT_SECRET = 'secreto_super_seguro_123';

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Validación de credenciales de prueba provistas por la guía de la asignatura
    if (username === 'admin' && password === '1234') {
        const token = jwt.sign(
            { username: username, role: 'administrator' },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Mitigación de XSS: Inyección de Cookie HttpOnly para la sesión segura
        res.cookie('session_token', token, {
            httpOnly: true,
            secure: true,       // Obliga el uso exclusivo del canal cifrado HTTPS
            sameSite: 'strict',   // Previene ataques CSRF de origen cruzado
            maxAge: 3600000       // Expira en 1 hora
        });

        // Retorno del JSON con el JWT para que el frontend lo guarde en sessionStorage
        return res.status(200).json({
            success: true,
            message: "Autenticación exitosa",
            token: token
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Usuario o contraseña inválidos"
        });
    }
};