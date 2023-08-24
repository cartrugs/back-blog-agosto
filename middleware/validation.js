const { validationResult } = require('express-validator');

/**
 * Middleware que valida los resultados de las validaciones de express-validator.
 * Si hay errores de validación, responde con un código de estado 400 y los errores.
 * Si no hay errores, pasa al siguiente middleware.
 *
 * @function
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función para pasar al siguiente middleware.
 * @returns {void}
 * @throws {400} Si hay errores de validación, responde con un código de estado 400 y los errores.
 */
const validarEx = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            ok: false, 
            errors
        });
    }
    next()
};

module.exports = {
    validarEx
};