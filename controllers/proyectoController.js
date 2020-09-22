const Proyecto = require('../models/ProjectModel');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
    //Revisar si hay errores en formulario
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
        res.json({ msg: 'Proyecto creado!!', proyecto });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        const { id } = req.usuario; //saco el id usuario a buscar
        const proyectos = await Proyecto.find({ creador: id })
            .sort({ creado: -1 });
        res.status(200).json({ proyectos })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// Actualizar un proyecto
exports.actualizarProyecto = async (req, res) => {
    //Revisar si hay errores en formulario
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }
    // Extraer info
    const { nombre } = req.body;
    const nuevoProyecto = {};
    if (nombre) {
        nuevoProyecto.nombre = nombre
    }

    try {
        //id a buscar
        const reqId = req.params.id
        const userId = req.usuario.id
        // Revisar el ID
        let proyecto = await Proyecto.findById(reqId)
        // Si el proyecto existe o no
        if (!proyecto) { return res.status(404).json({ msg: 'Proyecto no encontrado' }) }
        // Verificar el creador del proyecto
        if (proyecto.creador.toString() !== userId) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        // Actualizar
        proyecto = await Proyecto.findByIdAndUpdate(
            { _id: reqId }, { $set: nuevoProyecto }, { new: true }
        )
        res.status(200).json({ proyecto })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// Eliminar un proyecto
exports.eliminarProyecto = async (req, res) => {
    try {
        //id a buscar
        const reqId = req.params.id
        const userId = req.usuario.id
        // Revisar el ID
        let proyecto = await Proyecto.findById(reqId)
        // Si el proyecto existe o no
        if (!proyecto) { return res.status(404).json({ msg: 'Proyecto no encontrado' }) }
        // Verificar el creador del proyecto
        if (proyecto.creador.toString() !== userId) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        res.status(200).json({ msg: 'Proyecto eliminado' })
        // Eliminar el proyecto
        await Proyecto.findOneAndRemove({ _id: reqId })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}