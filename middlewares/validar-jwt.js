const { request, response } = require('express'); 
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe en la BD'
            });
        }

        // Verificar si el udi tiene estado en TRUE
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario con estado false'
            });
        }

        req.usuario = usuario;

        next();
    } catch(err) {
        console.log(err);

        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}