const { Router } = require('express');
const { body, param} = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria } = require('../controllers/categorias');

const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria);

router.post('/', [
    validarJWT,
    esAdminRole,
    body('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeCategoria),
    body('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], actualizarCategoria);

module.exports = router;