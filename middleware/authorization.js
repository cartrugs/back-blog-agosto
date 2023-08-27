
/**
 * Verifica si el usuario tiene el rol de superadministrador y permite o deniega el acceso en consecuencia.
 *
 * @param {Object} req - El objeto de solicitud (request) de Express.
 * @param {Object} res - El objeto de respuesta (response) de Express.
 * @param {function} next - La función de siguiente middleware a ser llamada si el usuario es superadministrador.
 * @returns {void}
 * @throws {Error} Acceso no autorizado - Si el usuario no tiene el rol de superadministrador.
 */
const usuarioEsSuperAdmin = (req, res, next) => {
    if (req.user && req.user.rol === 'superadmin') {
        return next();
    }
    res.status(403).send('Acceso no autorizado');
};

module.exports = {
    usuarioEsSuperAdmin
};

