// Importamos la librería jsonwebtoken para validar la firma de los tokens
const jwt = require('jsonwebtoken');

// Usamos la misma clave secreta declarada en el login para verificar la firma
const JWT_SECRET = 'secreto_super_seguro_123';

/**
 * Controlador para procesar la transacción de pago simulada
 * Requerimiento: POST /api/checkout protegida con Bearer Token
 */
exports.procesarPago = (req, res) => {
    // 1. Obtener la cabecera 'Authorization' enviada por el cliente
    const authHeader = req.headers['authorization'];

    // CONTROL DE SEGURIDAD: Validar si la cabecera está presente en la solicitud
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Acceso denegado. Cabecera de autorización faltante o inválida."
        });
    }

    try {
        // La cabecera usualmente viaja como "Bearer <token>". Aislamos la firma JWT.
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Acceso denegado. Token no estructurado correctamente."
            });
        }

        // 2. Verificar criptográficamente la autenticidad y vigencia del JWT
        // Si el token es corrupto, inválido o expiró, la librería lanza un error que va directo al catch.
        const usuarioVerificado = jwt.verify(token, JWT_SECRET);

        // 3. VALIDACIÓN DE ENTRADA (Input Validation): Validar la estructura del carro de compras
        const { carro } = req.body;

        // Comprobamos que el carro exista, sea un array válido y no esté vacío
        if (!carro || !Array.isArray(carro) || carro.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Solicitud incorrecta. El carro de compras está vacío o no es un array válido."
            });
        }

        // 4. RESPUESTA EXITOSA: El token es legítimo y los datos de entrada son correctos.
        // Simulamos la respuesta exitosa tras procesar la orden.
        return res.status(200).json({
            success: true,
            message: "Transacción aprobada de forma segura por pasarela de pago (Transbank).",
            usuario: usuarioVerificado.username,
            itemsProcesados: carro.length
        });

    } catch (error) {
        // CONTROL DE EXCEPCIONES: Captura errores de firma o expiración sin detener la terminal de Node.js
        return res.status(401).json({
            success: false,
            message: "Token inválido, expirado o adulterado. Autenticación fallida."
        });
    }
};