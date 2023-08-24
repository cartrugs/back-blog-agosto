const express = require("express");
/**
 * Módulo express-validator utilizado para validar y sanitizar datos en las rutas.
 * @external express-validator
*/
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/authController');
const { validarEx } = require('../middleware/validation');
const { validarJWT } = require('../middleware/validatorJWT');
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
        check('email', 'Email obligatório').isEmail(),
        check('nombre', 'Nombre obligatório').not().isEmpty(),
        check('password').notEmpty().withMessage('Contraseña obligatòria').isLength({ min: 6 }).withMessage('minimo 6 caracteres').matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/).withMessage('La contraseña debe contener pelo menos 1 mayuscula y 1 numero'),
        check('passConfirm').not().isEmpty(),
        validarEx
    ],
    createUser);

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
        check('email', 'Email obligatório').isEmail(),
        check('password', 'Password obligatório').not().isEmpty()
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

module.exports = router;
