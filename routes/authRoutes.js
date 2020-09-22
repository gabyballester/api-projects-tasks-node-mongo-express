// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

// Autenticar usuario

// api/auth
router.post('/',
     authController.autenticarUsuario
);

// Obtener el usuario autenticado
router.get('/',
     auth, authController.usuarioAutenticado
)

module.exports = router;