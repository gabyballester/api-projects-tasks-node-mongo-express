const mongoose = require('mongoose');

const UserModelSchema = mongoose.Schema({
    nombre: {
        type: String,
        requried: true,
        trim: true
    },
    email: {
        type: String,
        requried: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        requried: true,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UserModelSchema)