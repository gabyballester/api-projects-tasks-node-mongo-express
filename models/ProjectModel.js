const mongoose = require('mongoose');

const ProjectModelSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }, creador: {
        // referencia a modelo (como si fuera un join)
        type: mongoose.Schema.Types.ObjectId,
        // perteneciente al modelo Usuario
        ref: 'Usuario'
    }, creado: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Proyecto', ProjectModelSchema)