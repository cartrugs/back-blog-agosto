const  jwt = require('jsonwebtoken');

/**
 * Genera un token JWT con el UID y el nombre proporcionados.
 *
 * @function
 * @param {string} uid - Identificador único del usuario.
 * @param {string} nombre - Nombre del usuario.
 * @returns {Promise<string>} Una promesa que resuelve en un token JWT válido.
 * @throws {string} Si hay un error al generar el token.
 *
 * @example
 * const token = await generarToken('usuario123', 'Nombre Apellido');
 * Genera el payload directamente en la función generarToken usando los parámetros uid y nombre.
 */
const generarToken = (uid, nombre) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, nombre };

        jwt.sign(
            // Configura la expiración del token dentro de la función `jwt.sign` usando `{ expiresIn: '30m' }`
            payload,
            // Utiliza `process.env.JWT_SECRET` como clave secreta
            process.env.JWT_SECRET,
            { expiresIn: '1h'},
            (error, token) => {
                // Usa un enfoque basado en promesas y rechaza la promesa con un mensaje de error en caso de problemas
                if (error) {
                    console.log(error);
                    reject('Error al generar el token');
                };
                resolve(token);
            }
        );

    });
    
};

module.exports = {
    generarToken
};