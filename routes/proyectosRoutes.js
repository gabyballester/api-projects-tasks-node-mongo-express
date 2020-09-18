const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// Crea proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ], proyectoController.crearProyecto
)

//obtiene todos los proyectos del usuario actual
router.get('/',
    auth, proyectoController.obtenerProyectos
)

// Actualizar proyecto vía ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

// Eliminar proyecto vía ID
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)

module.exports = router