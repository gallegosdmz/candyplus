const { Router } = require('express');
const { body, param } = require('express-validator');
const { obtenerProveedores, crearProveedor, actualizarProveedor, eliminarProveedor } = require('../controllers/proveedor');
const { existeProveedorPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', [
    validarJWT,
    esAdminRole,
    validarCampos
], obtenerProveedores);

router.post('/', [
    validarJWT,
    esAdminRole,
    body('nombre', 'El nombre es obligatorio').notEmpty(),
    body('correo', 'El correo no es valido').isEmail(),
    body('telefono', 'El telefono es obligatorio').notEmpty(),
    validarCampos
], crearProveedor);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeProveedorPorId),
    body('nombre', 'El nombre es obligatorio').notEmpty(),
    body('correo', 'El correo no es valido').isEmail(),
    body('telefono', 'El telefono es obligatorio').notEmpty(),
    validarCampos
], actualizarProveedor);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeProveedorPorId),
    validarCampos
], eliminarProveedor);

module.exports = router;