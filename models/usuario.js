const { Schema, model, trusted } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    telefono: {
      type: String,
      required: [true, 'El telefono es obligatorio']  
    },

    ciudad: {
        type: String
    },

    provincia: {
        type: String
    },

    calle: {
        type: String
    },

    colonia: {
        type: String
    },

    codigoP: {
        type: String
    },

    numCasaInt: {
        type: String
    },

    numCasaExt: {
        type: String
    },

    img: {
        type: String
    },

    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }
});

// Sacar contraseña y __v de la respuesta del POST
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);