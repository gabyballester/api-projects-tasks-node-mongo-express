const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// api/tareas
// Crea tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
    ], tareaController.crearTarea
)
module.exports = router

//obtiene todos los proyectos del usuario actual
// router.get('/',
//     auth, proyectoController.obtenerProyectos
// )

// // Actualizar proyecto vía ID
// router.put('/:id',
//     auth,
//     [
//         check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
//     ],
//     proyectoController.actualizarProyecto
// )

// // Eliminar proyecto vía ID
// router.delete('/:id',
//     auth,
//     proyectoController.eliminarProyecto
// )

