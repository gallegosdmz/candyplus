const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const obtenerUsuarios = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        usuarios
    });
}

const crearUsuario = async(req = request, res = response) => {
    const {
        nombre,
        apellido,
        correo,
        password,
        telefono
    } = req.body;
    const usuario = new Usuario({nombre, apellido, correo, password, telefono});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const agregarDireccion = async(req = request, res = response) => {
    const {id} = req.params;
    
    const {_id, password, google, correo, nombre, apellido, telefono, rol, img, ...resto} = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json(usuario);
}

const crearAdmin = async(req = request, res = response) => {
    const {id} = req.params;

    const {_id, password, google, correo, telefono, nombre, apellido, ...resto} = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json(usuario);
}

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    crearAdmin,
    agregarDireccion
}