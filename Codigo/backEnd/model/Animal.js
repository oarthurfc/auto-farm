const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sexo = Object.freeze({
    MACHO : 'macho',
    FEMEA: 'femea'
})
const animalSchema = new Schema({
    
    nome : {
        type : String,
        required: True
    },
    sexo : {
        type : String,
        enum : Object.values(Sexo),
        required : true

    },
    nascimento : {
        type : Date,
        required : true

    },
    raca : {
        type : String,
        required : true
    }



})

Object.freeze(sexo);




module.exports = mongoose.model('Animal',animalSchema)