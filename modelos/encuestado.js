const mongoose = require('mongoose');
const { Schema } = mongoose;

const Encuestado = new Schema({
    nombre:{type:String},
    correo:{type:String},
    edad:{type:String},
    redesTiempo:{type:Object},
    redfav:{type:String},
    sexo:{type:String}
})

module.exports = mongoose.model('Encuestados', Encuestado)