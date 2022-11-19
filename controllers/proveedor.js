const { response, request } = require('express');

const Proveedor = require('../models/proveedor');

const obtenerProveedores = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, proveedores] = await Promise.all([
        Proveedor.countDocuments(query),
        Proveedor.find(query)
        .skip(desde)
        .limit(limite)
    ]);

    res.json({
        total,
        proveedores
    });
}

const obtenerProveedor = async(req = request, res = response) => {
    const {id} = req.params;

    const proveedor = await Proveedor.findById(id);

    res.json(proveedor);
}

const crearProveedor = async(req = request, res = response) => {
    const {
        nombre,
        correo,
        telefono
    } = req.body;
    const proveedor = new Proveedor({nombre, correo, telefono});

    // Guardar en BD
    await proveedor.save();

    res.json({
        proveedor
    });
}

const actualizarProveedor = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, ...resto} = req.body; 

    const proveedor = await Proveedor.findByIdAndUpdate(id, resto, {new: true});

    res.json(proveedor);
}

const eliminarProveedor = async(req = request, res = response) => {
    const {id} = req.params;

    const proveedor = await Proveedor.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        msg: 'Proveedor eliminado',
        proveedor
    });
}

module.exports = {
    obtenerProveedores,
    obtenerProveedor,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
}