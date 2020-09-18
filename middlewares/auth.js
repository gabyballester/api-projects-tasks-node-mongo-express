const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // Leer cabecera y revisar si no hay token
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' })
    }

    try {
        // Limpiar palabra Bearer del token
        const token = req.headers.authorization.split(" ")[1];
        const descifrado = jwt.verify(token, process.env.SECRETA)
        req.usuario = descifrado.usuario;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token no válido' })
    }
    // Validar el token
}