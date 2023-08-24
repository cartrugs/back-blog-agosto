const { Schema, model } = require('mongoose');

/**
 * Esquema para definir la estructura de un artículo.
 * @module ArticuloSchema
 */
const articuloSchema = new Schema({
    /**
     * Título del artículo.
     * @type {string}
     * @required
     */
    title: {
        type: String,
        require: true
    },
    /**
     * Fecha de publicación del artículo.
     * @type {Date}
     * @required
     */
    date: {
        type: Date,
        require: true
    },
    /**
     * Imagen de cabecera del artículo.
     * @type {Object}
     * @property {string} url - URL de la imagen.
     * @property {string} alt - Texto alternativo de la imagen.
     * @required
     */
    headerImage: {
        url: {
            type: String,
            require: true

        },
        alt: {
           type: String,
           require: true 
        }
    },
    /**
     * Extracto del artículo.
     * @type {string}
     * @required
     */
    excerpt: {
        type: String,
        require: true
    },
    /**
     * Categoría del artículo.
     * @type {string}
     * @required
     */
    category: {
        type: String,
        require: true
    },
    /**
     * Contenido completo del artículo.
     * @type {string}
     * @required
     */
    content: {
        type: String,
        require: true
    }
});

/**
 * Modelo de datos para artículos.
 * @typedef {Object} Articulo
 * @property {string} title - Título del artículo.
 * @property {Date} date - Fecha de publicación del artículo.
 * @property {Object} headerImage - Imagen de cabecera del artículo.
 * @property {string} headerImage.url - URL de la imagen de cabecera.
 * @property {string} headerImage.alt - Texto alternativo de la imagen de cabecera.
 * @property {string} excerpt - Extracto del artículo.
 * @property {string} category - Categoría del artículo.
 * @property {string} content - Contenido completo del artículo.
 */


module.exports = model('Articulo', articuloSchema);
