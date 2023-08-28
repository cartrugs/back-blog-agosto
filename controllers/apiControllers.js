/**
 * Método para usar el modelo de la base de datos.
 * @type {ArticuloModel}
 */
const Articulo = require('../models/ArticuloModels');


/*--------------------------------------- RECOGER TODAS LOS ARTÍCULOS ---------------------------------------*/

/**
 * Método de controlador para obtener todas los artículos con función asíncrona.
 * @param {Request} req - Objeto de solicitud que contiene los datos de la solicitud.
 * @param {Response} res - Objeto de respuesta que se utilizará para enviar una respuesta HTTP.
 * @returns {Promise<Response>} La respuesta HTTP con la lista de películas en formato JSON.
 */
const obtenerArticulo = async (req, res) => {

    try {
        /**
       * Realizar una consulta a la base de datos utilizando el modelo Articulo.
       * El método find() busca todos los documentos en la colección asociada al modelo Articulo.
       * Esta consulta devuelve una promesa que se resuelve con una lista de documentos que coinciden con los criterios de búsqueda.
       */
        const articulos = await Articulo.find();
        console.log('Articulos encontrados:', articulos)

        return res.status(200).json({
            ok: true,
            msg: 'Nuestros artículos',
            data: articulos,
        });
        
        /**
            *Capturar y manejar posibles errores que puedan ocurrir durante la ejecución de la consulta o el renderizado de la vista.
            */
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Contactar con el administrador'
        });
    }
};

/*--------------------------------------- RECOGER UN ARTÍCULO ---------------------------------------*/

/**
 * Buscar un artículo por su título en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON con el resultado de la búsqueda del artículo.
 */
const buscarUnArticuloPorNombre = async (req, res) => {

    // Extraer el título del artículo de los parámetros de la solicitud
    const titulo = await req.params.title;

    try {
        // Buscar un artículo en la base de datos con el título especificado
        const existe = await Articulo.findOne( { title: titulo });

        if (existe) {
            // Si se encontró el artículo, devolver una respuesta exitosa con los detalles del artículo.
            return res.status(200).json({
                ok: true,
                msg: 'Artículo encontrado',
                data: existe
            });  
        } else {
            // Si no se encontró el artículo, devolver un error 400 con un mensaje descriptivo.
            return res.status(400).json({
                msg: 'Error 400. Petición errónea'
            });
        }
        // Capturar y manejar posibles errores que puedan ocurrir durante la ejecución de la consulta o el renderizado de la vista.
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Contactar con el administrador'
        });
    }
};

/*--------------------------------------- AÑADIR UN ARTÍCULO ---------------------------------------*/

/**
 * Método de controlador para crear un nuevo artículo en la base de datos con función asíncrona.
 * @param {Request} req - Objeto de solicitud que contiene los datos de la solicitud, incluyendo los datos del nuevo artículo en el cuerpo de la solicitud.
 * @param {Response} res - Objeto de respuesta que se utilizará para enviar una respuesta HTTP.
 * @returns {Promise<Response>} La respuesta HTTP con los datos del artículo creado en formato JSON.
 */
const crearUnArticulo = async (req, res) => {
    // Crear una nueva instancia del modelo 'Articulo' con los datos del cuerpo de la solicitud
    const articulo = new Articulo(req.body);

    try {
        // Verificar si el usuario autenticado es un editor
        if (!req.user.isEditor) {
            return res.status(403).json({
                ok: false,
                msg: 'Acceso denegado. Solo los editores pueden crear noticias.'
            });
        }

        // Obtener el título del artículo del cuerpo de la solicitud
        const { title } = req.body;

        // Verificar si ya existe un artículo con el mismo título en la base de datos
        const existe = await Articulo.findOne({ title });

        console.log('Existe:', existe);
        console.log('Título buscado:', title);

        if (existe) {
            return res.status(400).json({
                ok: false,
                msg: 'Petición errónea. ¡El artículo ya está en la base de datos!'
            });
        }

        // Guardar el nuevo artículo en la base de datos
        const articuloSubido = await articulo.save();
        return res.status(200).json({
            ok: true,
            msg: 'Artículo subido',
            articulo: articuloSubido
        });
        // Capturar y manejar posibles errores que puedan ocurrir durante la ejecución de la consulta o el renderizado de la vista.
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Contactar con el administrador'
        });
    }
};

/*--------------------------------------- EDITAR UN ARTÍCULO ---------------------------------------*/

/**
 * Método de controlador para editar un artículo existente en la base de datos con función asíncrona.
 * @param {Request} req - Objeto de solicitud que contiene los datos de la solicitud, incluyendo el ID del artículo a editar en los parámetros y los nuevos datos del artículo en el cuerpo de la solicitud.
 * @param {Response} res - Objeto de respuesta que se utilizará para enviar una respuesta HTTP.
 * @returns {Promise<Response>} La respuesta HTTP con los datos de la película actualizada en formato JSON.
 */
const editarArticulo = async (req, res) => {
    const id = req.params.id;

    try {
        // Verificar si el usuario autenticado es un editor
        if (!req.user.isEditor) {
            return res.status(403).json({
                ok: false,
                msg: 'Acceso denegado. Solo los editores pueden crear noticias.'
            });
        }

        /**
         * Realizar una consulta a la base de datos utilizando el modelo Articulo y el método findByIdAndUpdate.
         * El método findByIdAndUpdate() busca en todos los documentos en la colección asociada al modelo Articulo.
         * @param {string} id - El (_id) del artículo que se va a modificar.
         * @param {Object} body - Los datos que se actualizarán en el artículo.
         * @param {Object} options - Opciones adicionales para la actualización. En este caso, se utiliza { new: true } para devolver el artículo modificado en vez de la original.
         * @returns {Promise<Document|null>} Una promesa que se resuelve con el documento de un artículo modificado o null si no existe.
         */
        const existe = await Articulo.findOne({ _id: id });
        const articuloEditado = await Articulo.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (existe) {
            return res.status(200).json({
                ok: true,
                msg: 'Artículo editado correctamente',
                articulo: articuloEditado
            });
        };
        return res.status(400).json({
            ok: false,
            msg: 'Error 400. Petición errónea'
        });
        // Capturar y manejar posibles errores que puedan ocurrir durante la ejecución de la consulta o el renderizado de la vista.
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Contactar con el administrador'
        });
    }
};

/*--------------------------------------- ELIMINAR UN ARTÍCULO ---------------------------------------*/

/**
* Método de controlador para eliminar un artículo de la base de datos con función asíncrona.
* @param {Request} req - Objeto de solicitud que contiene los datos de la solicitud, incluyendo el ID del artículo a eliminar en los parámetros.
* @param {Response} res - Objeto de respuesta que se utilizará para enviar una respuesta HTTP.
* @returns {Promise<Response>} La respuesta HTTP con un mensaje indicando que el artículo ha sido eliminado.
*/
const eliminarArticulo = async (req, res) => {
    const id = req.params.id;

    try {
        // Verificar si el usuario autenticado es un editor
        if (!req.user.isEditor) {
            return res.status(403).json({
                ok: false,
                msg: 'Acceso denegado. Solo los editores pueden crear noticias.'
            });
        }
        
        /**
        * Realizar una consulta a la base de datos utilizando el modelo Articulo y el método findByIdAndDelete.
        * @method findByIdAndDelete
        * @param {string} id - El (_id) del artículo que se desea elimnar.
        * @returns {Promise<Document|null>} Una promesa que se resuelve con el documento de un artículo eliminado o null si no existe.
        */
       const existe = await Articulo.findByIdAndDelete(id);

       if (existe) {
        return res.status(200).json({
            ok: true,
            msg: 'Artículo eliminado correctamente',
            data: existe
        });
       } else {
        return res.status(400).json({
            msg: 'Error 400. Petición errónea'
        });
       }
       // Capturar y manejar posibles errores que puedan ocurrir durante la ejecución de la consulta o el renderizado de la vista.
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Contactar con el administrador'
        });
    }
};


// Exportar las funciones para que puedan ser utilizadas en otras partes del código
module.exports = {
    obtenerArticulo,
    buscarUnArticuloPorNombre,
    crearUnArticulo,
    editarArticulo,
    eliminarArticulo
};
