const Tarea = require('../models/TareaModel');
const Proyecto = require('../models/ProjectModel');
const { validationResult } = require('express-validator');

// Crear nueva tarea
exports.crearTarea = async (req, res) => {

    //Revisar si hay errores en formulario
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        // Extraigo el proyecto y compruebo si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto)
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        // comprobar que el proyecto pertenece al usuario autenticado
        const userId = req.usuario.id
        if (existeProyecto.creador.toString() !== userId) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        // Crear tarea
        const tarea = new Tarea(req.body)
        // Guardar tarea
        await tarea.save();
        res.json({ tarea })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }
}


// Obtiene tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    try {
        // Extraigo el proyecto y compruebo si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto)
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        // Filtrar tareas por proyecto
        const tareas = await Tarea.find({ proyecto: proyecto })
        res.status(200).json({ tareas }) //.sort({ creado: -1 });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
    try {
        // Extraigo propiedades de la tarea y tearea id
        const { proyecto, nombre, estado } = req.body;
        const tareaId = req.params.id;
        // Comprobar que la tarea existe y por tanto el proyecto
        let tarea = await Tarea.findById(tareaId)
        if (!tarea) {
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        }
        //Extraer proyecto el proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        // Comprobar que el proyecto pertenece al usuario autenticado
        const userId = req.usuario.id
        if (existeProyecto.creador.toString() !== userId) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        // Crear un objeto con la nueva información
        const nuevaTarea = {};
        if (nombre) nuevaTarea.nombre = nombre;
        if (estado) nuevaTarea.estado = estado;
        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({ _id: tareaId }, nuevaTarea, { new: true });
        res.status(200).json({ tarea })

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// Eliminar un proyecto
exports.eliminarTarea = async (req, res) => {
    try {
        // Extraigo proyecto de la tarea y tarea id
        const { proyecto } = req.body;
        const tareaId = req.params.id;
        // Comprobar que la tarea existe y por tanto el proyecto
        let tarea = await Tarea.findById(tareaId)
        if (!tarea) {
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        }
        //Extraer proyecto el proyecto
        const existeProyecto = await Proyecto.findById(proyecto)
        // Comprobar que el proyecto pertenece al usuario autenticado
        const userId = req.usuario.id
        if (existeProyecto.creador.toString() !== userId) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        //Eliminar tarea
        await Tarea.findOneAndRemove({ _id: tareaId })
        res.status(200).json({ msg: 'Tarea eliminada' })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}
    // //Revisar si hay errores en formulario
    // const errores = validationResult(req);
    // if (!errores.isEmpty()) {
    //     return res.status(400).json({ errores: errores.array() })
    // }


//     // Extraer info
//     const { nombre } = req.body;
//     const nuevoProyecto = {};
//     if (nombre) {
//         nuevoProyecto.nombre = nombre
//     }


//         //id a buscar
//         const reqId = req.params.id
//         const userId = req.usuario.id
//         // Revisar el ID
//         let proyecto = await Proyecto.findById(reqId)
//         // Si el proyecto existe o no
//         if (!proyecto) { return res.status(404).json({ msg: 'Proyecto no encontrado' }) }
//         // Verificar el creador del proyecto
//         if (proyecto.creador.toString() !== userId) {
//             return res.status(401).json({ msg: 'No Autorizado' });
//         }
//         // Actualizar
//         proyecto = await Proyecto.findByIdAndUpdate(
//             { _id: reqId }, { $set: nuevoProyecto }, { new: true }
//         )
//         res.status(200).json({ proyecto })


// // Eliminar un proyecto
// exports.eliminarProyecto = async (req, res) => {
//     try {
//         //id a buscar
//         const reqId = req.params.id
//         const userId = req.usuario.id
//         // Revisar el ID
//         let proyecto = await Proyecto.findById(reqId)
//         // Si el proyecto existe o no
//         if (!proyecto) { return res.status(404).json({ msg: 'Proyecto no encontrado' }) }
//         // Verificar el creador del proyecto
//         if (proyecto.creador.toString() !== userId) {
//             return res.status(401).json({ msg: 'No Autorizado' });
//         }
//         res.status(200).json({ msg: 'Proyecto eliminado' })
//         // Eliminar el proyecto
//         await Proyecto.findOneAndRemove({ _id: reqId })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error en el servidor');
//     }
// }