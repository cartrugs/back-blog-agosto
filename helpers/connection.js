/**
 * Módulo de Mongoose para la conexión a la base de datos MongoDB.
 * @module mongoose
 */
const mongoose = require('mongoose');

/**
 * Función para establecer la conexión con la base de datos MongoDB.
 * @async
 * @function
 * @returns {Promise<object>} Un objeto que indica el resultado de la conexión.
 * @throws {Error} Error si no se puede establecer la conexión.
 */
const dbConnect = async () => {
    try {
        /**
         * Se intenta conectar con la base de datos utilizando mongoose y la URI proporcionada en la variable de entorno: (process.env).
         */
        const res = await mongoose.connect(process.env.URI_DB);
        /**
         * Mensaje de Confirmación
         * @function
         * @param {string} Mensaje que indica que la conexión a la base de datos se ha establecido.
         */
        console.log('Conectado a la base de datos desde connection.js');
        /**
         * Devuelve el resultado de la conexión.
         */
        return res
    } catch (error) {
        /**
         * Manejo de Errores
         * @function
         * @param {Error} error - Error que se produce si la conexión falla.
         * @returns {object} Un objeto que indica el resultado de la conexión fallida.
         */
        return {
            ok: false,
            msg: 'Error al conectar la base de datos'
        }
    }
}

/**
 * Exporta la función dbConnect para su uso en otros módulos.
 */
module.exports = { dbConnect };