const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria');

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});

    if (existeEmail) {
        throw new Error(`El correo ${correo}, ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
     const existeUsuario = await Usuario.findById(id);

     if (!existeUsuario) {
        throw new Error(`El id ${id}, no existe`);
     }
}

const existeCategoria = async(id) => {
    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {
        throw new Error(`El id ${id}, no existe`);
    }
}

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    existeCategoria
}