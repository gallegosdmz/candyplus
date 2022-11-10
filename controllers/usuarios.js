const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const obtenerUsuarios = (req = request, res = response) => {
    res.json({
        msg: 'GET - USUARIOS'
    });
}

module.exports = {
    obtenerUsuarios
}