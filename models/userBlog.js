const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    role: {
        type: String,
        required: true,
        default: 'member'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', userSchema);