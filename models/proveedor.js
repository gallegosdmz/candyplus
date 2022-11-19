const { Schema, model } = require('mongoose');

const ProveedorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },

    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio']
    },
    
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});

ProveedorSchema.methods.toJSON = function() {
    const {__v, estado, ...proveedor} = this.toObject();

    return proveedor;
}

module.exports = model('Proveedor', ProveedorSchema);