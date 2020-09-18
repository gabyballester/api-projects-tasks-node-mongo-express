const Usuario = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {

     //Revisar si hay errores en formulario
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // extraer email y password
    const { email, password } = req.body;

    try {
        //comprobar usuario único
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ msg: 'Usuario ya existe' });
        }
        // crea el nuevo usuario
        usuario = new Usuario(req.body)
        // hashear password
        const salt = await bcryptjs.genSalt(10); //asigno un salt
        usuario.password = await bcryptjs.hash(password, salt);
        //guarda usuario
        await usuario.save()
        
        // Crear jwt con datos usuario
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
        res.status(400).send('Hubo un error');
    }
}
