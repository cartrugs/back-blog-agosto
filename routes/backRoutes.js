/**
 * Módulo de Express para crear y manejar rutas.
 * @module express
 */
const express = require('express');

const { obtenerArticulo, buscarUnArticuloPorNombre, buscarArticuloPorPalabraClave, crearUnArticulo, editarArticulo, eliminarArticulo } = require('../controllers/apiControllers')

/**
 * Objeto Router de Express para definir rutas.
 * @type {object}
 */
const router = express.Router();

// RECOGER TODOS LOS ARTÍCULOS
router.get('/', obtenerArticulo);

// RECOGER UN ARTÍCULO POR TÍTULO
router.get('/:title', buscarUnArticuloPorNombre);

// AÑADIR UN ARTÍCULO
router.post('/', crearUnArticulo);

// EDITAR UN ARTÍCULO
router.put('/:id', editarArticulo);

// EDITAR UN ARTÍCULO
router.delete('/:id', eliminarArticulo)


/**
 * Exportación del objeto Router para su uso en otros módulos.
 * @module router
 */
module.exports = router;