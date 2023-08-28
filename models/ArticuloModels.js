const { Schema, model } = require('mongoose');

/**
 * Esquema para definir la estructura de un artículo.
 * @module ArticuloSchema
 */
const articuloSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
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
    excerpt: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});


module.exports = model('Articulo', articuloSchema);
