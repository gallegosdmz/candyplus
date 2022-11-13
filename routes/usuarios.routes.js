const { Router } = require('express');
const { body, param } = require('express-validator');
const { obtenerUsuarios, crearUsuario, crearAdmin, agregarDireccion } = require('../controllers/usuarios');
const { emailExiste, existeUsuarioPorId, comparacionId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', obtenerUsuarios);

router.post('/', [
    body('nombre', 'El nombre es obligatorio').notEmpty(),
    body('apellido', 'El apellido es obligatorio').notEmpty(),
    body('telefono', 'El telefono es obligatorio').notEmpty(),
    body('password', 'La contraseña debe ser de más de 6 letras').isLength({min: 6}),
    body('correo', 'El correo no es válido').isEmail(),
    body('correo').custom(emailExiste),
    validarCampos
], crearUsuario);

router.put('/direccion/:id', [
    validarJWT,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeUsuarioPorId),
    param('id').custom(comparacionId),
    body('ciudad', 'La ciudad es obligatoria').notEmpty(),
    body('provincia', 'La provincia es obligatoria').notEmpty(),
    body('calle', 'La calle es obligatoria').notEmpty(),
    body('colonia', 'La colonia es obligatoria').notEmpty(),
    body('codigoP', 'El codigo postal es obligatorio').notEmpty(),
    body('codigoP', 'El codigo debe ser un numero').isNumeric(),
    body('numCasaInt', 'Debe ser un número').isNumeric(),
    body('numCasaExt', 'El numero exterior es obligatorio').notEmpty(),
    body('numCasaExt', 'Debe ser un número').isNumeric(),
    validarCampos
], agregarDireccion);

router.put('/admin/:id', [
    validarJWT,
    esAdminRole,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeUsuarioPorId),
    validarCampos
], crearAdmin);


module.exports = router;