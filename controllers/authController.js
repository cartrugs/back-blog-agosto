/**
 * Se importa el modelo User desde el archivo userBlog.js y la función generarToken desde el módulo jwt que has definido.
 */
const User = require('../models/userBlog');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

// POST CREAR USER

/**
 * @function
 * @description Crear un nuevo usuario.
 * @param {object} req.body - Objeto de solicitud HTTP con los datos del nuevo usuario.
 * @param {string} req.body.email - Email del nuevo usuario.
 * @param {string} req.body.password - Contraseña del nuevo usuario.
 * @param {string} req.body.passConfirm - Confirmación de la contraseña del nuevo usuario.
 * @param {string} req.body.nombre - Nombre del nuevo usuario.
 * @param {string} req.body.role - Rol del nuevo usuario (opcional).
 * @param {string} req.body.date - Fecha del nuevo usuario (opcional).
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Respuesta con el resultado del registro del nuevo usuario.
 * @throws {400} Si el usuario ya está registrado, la contraseña no coincide con la confirmación o los datos son inválidos.
 * @throws {500} Si ocurre un error interno en el servidor.
 */
const createUser = async (req, res) => {
    // Extrae los datos del cuerpo de la solicitud
    const { email, password, passConfirm, nombre, role, date } = req.body

    try {
        // Busca si ya existe un usuario con el mismo email
        let user = await User.findOne({ email: email });

        if (user) {
            // Si el usuario ya existe, devuelve una respuesta de error
            return res.status(400).json({
                ok: false,
                msg: 'Ese usuario ya está registrado'
            });
        }

        if (password !== passConfirm) {
            // Si las contraseñas no coinciden, devuelve una respuesta de error
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña introducida no coincide'
            });
        }

        // Crea un nuevo usuario con los datos proporcionados
        const newUser = { email, password, nombre, role, date };
        user = new User(newUser);

        // Guarda el usuario en la base de datos
        const saveUser = await user.save();
        return res.status(201).json({
            ok: true,
            data: saveUser,
            msg: 'Nuevo usuario registrado correctamente'
        });

    } catch (error) {
        // Manejo de errores y respuesta de error en caso de fallo
        res.status(500).json({
            ok: false,
            msg: 'Error 500. Contacta con el administrador'
        });
        console.log(error);
    }
};

// POST LOGIN USER

/**
 * @function
 * @description Inicio de sesión de usuario.
 * @param {object} req.body - Objeto de solicitud HTTP con los datos del usuario.
 * @param {string} req.body.email - Email del usuario para el inicio de sesión.
 * @param {string} req.body.password - Contraseña del usuario para el inicio de sesión.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Respuesta con el resultado del inicio de sesión y el token JWT en caso de éxito.
 * @throws {400} Si el usuario no existe o la contraseña es incorrecta.
 * @throws {500} Si ocurre un error interno en el servidor.
 */
const loginUser = async (req, res) => {
    // Extrae los datos del cuerpo de la solicitud
    const { email, password } = req.body;

    try {
        // Busca un usuario con el email proporcionado
        let user = await User.findOne({ email: email });
        console.log(user, 'UN CONSOLE DE PRUEBA')

        if (!user) {
            // Si el usuario no existe, devuelve una respuesta de error
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        let passOk = await bcrypt.compare(password, user.password);
        if (!passOk) {
            // Si la contraseña no coincide, devuelve una respuesta de error
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no coincide'
            });
        }

        // Genera un token JWT para el usuario autenticado
        const token = await generarToken(user.id, user.nombre);
        res.status(200).json({
            ok: true,
            uid: user.id,
            email: user.email,
            nombre: user.nombre,
            token
        });
    } catch (error) {
        // Manejo de errores y respuesta de error en caso de fallo
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }
};


// RENEW TOKEN

/**
 * @function
 * @description Renovar el token de autenticación de un usuario.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {string} req.uid - ID único del usuario autenticado.
 * @param {string} req.nombre - Nombre del usuario autenticado.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {object} Respuesta con el nuevo token renovado y los detalles del usuario.
 * @throws {500} Si ocurre un error interno en el servidor.
 */
const renewToken = async(req, res) => {
    // Extrae los datos del usuario desde la solicitud
    const { uid, nombre } = req;
    
    // Genera un nuevo token JWT basado en los datos del usuario
    const token = await generarToken(uid, nombre);

    // Devuelve una respuesta con el nuevo token y los datos del usuario
    res.status(200).json({
        ok: true,
        msg: 'Token renovado',
        user: {
            uid,
            nombre,
        },
        token
    });
};


module.exports = {
    createUser,
    loginUser,
    renewToken
}