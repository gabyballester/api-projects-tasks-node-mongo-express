const Usuario = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {

     //Revisar si hay errores en formulario
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // extraer email y password
    const { email, password } = req.body;
    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario no existe' });
        }
        // Revisar password correcto
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Password incorrecto' });
        }

        // Si todo es correcto, crear jwt con datos usuario
        const payload = {
            usuario: {
                id: usuario.id,
            }
        }
        // Firmar jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1 hora
        }, (error, token) => {
            // si hay error
            if (error) throw error;
            // mensaje de confirmación
            res.json({ token });
        })


    } catch (error) {
        console.log(error);
    }
}