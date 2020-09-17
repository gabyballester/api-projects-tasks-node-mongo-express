const Usuario = require('../models/UserModel');

exports.crearUsuario = async (req, res) => {

    // extraer email y password
    const { email, password } = req.body;

    try {
        //comprobar usuario único
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: 'Usuario ya existe'});
        }
        // crea el nuevo usuario
        usuario = new Usuario(req.body)
        //guarda usuario
        await usuario.save()
        res.status(200).json({msg: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}