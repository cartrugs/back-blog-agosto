/** 
 *  Importación del módulo jsonwebtoken que se utiliza para trabajar con tokens JWT.
*/
const jwt = require('jsonwebtoken');

/**
 * Middleware para validar un token JWT en las solicitudes.
 * Verifica la autenticidad del token y agrega información del usuario al objeto de solicitud.
 *
 * @function
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función para pasar al siguiente middleware o controlador.
 * @returns {void} No devuelve un valor directamente, pero permite que la solicitud continúe si el token es válido.
 *
 * @throws {401} Si no se encuentra el token en el encabezado de la solicitud.
 * @throws {401} Si el token no es válido o no puede ser verificado.
 *
 * @example
 * // Uso en una ruta protegida
 * router.get('/ruta-protegida', validarJWT, (req, res) => {
 *   // El middleware validarJWT verifica y decodifica el token.
 *   // Si el token es válido, agrega información del usuario a req.
 *   // Continúa con el controlador después de la validación.
 *   res.status(200).json({
 *     ok: true,
 *     msg: 'Ruta protegida accesible solo para usuarios autenticados',
 *     usuario: {
 *       uid: req.uid,
 *       nombre: req.nombre
 *     }
 *   });
 * });
 * 
 * Define la función middleware validarJWT que toma tres parámetros: req (objeto de solicitud), res (objeto de respuesta) y next (función para pasar al siguiente middleware o controlador).
 */
const validarJWT = (req, res, next) => { 
    // Extrae el token del encabezado de la solicitud
    const token = req.headers.authorization; 

    if (!token) {
        //Verifica si el token está presente en el encabezado. Si no lo está, devuelve una respuesta de error 401 (No autorizado) indicando que el token no se encontró
        return res.status(401).json({
            ok: false,
            msg: 'Token not found'
        });
    }

    try {
        // Verifica y decodifica el token utilizando la clave secreta (JWT_SECRET) definida en las variables de entorno. Si el token es válido, payload contendrá la información codificada en el token
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Agrega el identificador ÚNICO `uid` del usuario extraído del token al objeto de solicitud `req`
        req.uid = payload.uid;       // Identificador único del usuario
        req.nombre = payload.nombre; // Nombre del usuario
        next();
    } catch (error) {
        // Si el token no es válido, devuelve una respuesta de error 401
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
    //  Llama a la función next() para pasar al siguiente middleware o controlador en la cadena. Esto permite que la solicitud continúe su procesamiento normal.
    
};

module.exports = { validarJWT };