const { Router } = require('express');
const { body, param } = require('express-validator');
const { obtenerUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', obtenerUsuarios);

module.exports = router;