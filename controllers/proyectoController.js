const Proyecto = require('../models/ProjectModel');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }
    try {
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body)
        // Asigno creador que hemos asignado a req.usuario via JWT
        proyecto.creador = req.usuario.id
        //Guardar el proyecto
        proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}