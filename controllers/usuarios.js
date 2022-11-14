const { response, request } = require('express');
const jwt = require('jsonwebtoken');
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

const editarUsuario = async(req = request, res = response) => {
    const {id} = req.params;

    const buscar = await Usuario.findById(id);

    // Extraemos token
    const token = req.header('x-token');

    // Extraemos uid del token
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Verificacion
    if (uid !== id) {
        return res.status(401).json({
            msg: 'No puedes manipular esta información'
        });
    }

    const {_id, password, google, correo, rol, ...resto} = req.body;

    // Verificacion de correo enviado
    if (correo !== buscar.correo) {
        const buscarCorreo = await Usuario.findOne({correo});

        if (buscarCorreo) {
            return res.status(400).json({
                msg: `El correo ${correo}, ya lo está usando otro usuario`
            });
        }

        resto.correo = correo;
    }

    if (password) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json(usuario);
}

const agregarDireccion = async(req = request, res = response) => {
    const {id} = req.params;

    // Extraemos token
    const token = req.header('x-token');

    // Extraemos uid del token
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Verificacion
    if (uid !== id) {
        return res.status(401).json({
            msg: 'No puedes manipular esta información'
        });
    }
    
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

const eliminarUsuario = async(req = request, res = response) => {
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(usuario);
}

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    crearAdmin,
    agregarDireccion,
    editarUsuario,
    eliminarUsuario
}