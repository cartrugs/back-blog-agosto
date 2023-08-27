const express = require("express");
/**
 * Módulo express-validator utilizado para validar y sanitizar datos en las rutas.
 * @external express-validator
*/
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/authController');
const { validarEx } = require('../middleware/validation');
const { validarJWT } = require('../middleware/validatorJWT');
const { usuarioEsSuperAdmin } = require('../middleware/authorization');

/**
 * Express Router utilizado para definir rutas relacionadas con la autenticación de usuarios.
 * @type {object}
 * @const
 * @namespace AuthRouter
 */
const router = express.Router();

/**
 * @typedef {import('express-validator').ValidationChain} ValidationChain
 *  `@typedef` en JSDoc es una etiqueta que se utiliza para definir un tipo personalizado que se puede usar en otras partes de la documentación para hacer referencia a ese tipo. Es especialmente útil para crear abstracciones y simplificar la documentación cuando se tienen tipos de datos complejos o estructuras repetitivas
 */


router.post('/register',
    [
        check('email', 'email obligatorio').isEmail(),
        check('nombre', 'Nombre obligatorio').not().isEmpty(),
        check('password').notEmpty().withMessage('Contraseña obligatoria').isLength({ min: 6 }).withMessage('mínimo 6 caracteres').matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/).withMessage('La contraseña debe contener al menos 1 mayúscula y 1 número'),
        check('passConfirm').not().isEmpty(),
        validarEx
    ],
    createUser
    );

/**
 * Rutas relacionadas con la autenticación y el manejo de tokens JWT.
 * @module routes/authRoutes
 */

/**
 * Realiza el inicio de sesión de un usuario.
 * @function
 * @name POST /api/auth/login
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {JSON} - Información sobre el usuario y el token generado.
 * @throws {400} - Error si los datos de inicio de sesión son inválidos.
 * @throws {500} - Error interno del servidor.
 */
router.post('/login',
    [
        check('email', 'email obligatorio').isEmail(),
        check('password', 'Password obligatorio').not().isEmpty()
    ],
    loginUser
);

/**
 * Renueva el token de un usuario autenticado.
 * @function
 * @name GET /api/auth/renew
 * @param {string} Authorization - Encabezado de autorización que contiene el token.
 * @returns {JSON} - El nuevo token generado.
 * @throws {401} - Error si el token no es válido o no está presente.
 * @throws {500} - Error interno del servidor.
 */
router.get('/renew', validarJWT, renewToken);

/**
 * Ruta GET restringida solo para superadministradores.
 * @name GET /admin/solo-superadmin
 * @function
 * @memberof module:rutas
 * @inner
 * 
 * @param {Object} req - El objeto de solicitud (request) de Express.
 * @param {Object} res - El objeto de respuesta (response) de Express.
 * @returns {void}
 * @throws {Error} Acceso no autorizado - Si el usuario no es superadministrador.
 */
// router.delete('/usuarios/eliminar/:id', usuarioEsSuperAdmin, eliminarUsuario);



module.exports = router;
