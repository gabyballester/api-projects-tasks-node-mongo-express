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

// Obtiene tareas por proyecto
router.get('/',
    auth, tareaController.obtenerTareas
)

// Actualizar tareas
router.put('/:id',
    auth, tareaController.actualizarTarea
)

// Actualizar tareas
router.delete('/:id',
    auth, tareaController.eliminarTarea
)

module.exports = router



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

