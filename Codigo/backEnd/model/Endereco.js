const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const enderecoSchema = new Schema({
    
    cep : {
        type : String,
        required: false
    },
    rua : {
        type : String,
        required : true

    },
    bairro : {
        type : String,
        required : true

    },
    cidade : {
        type : String,
        required : true
    },
    estado : {
        type : String,
        required : true
    },
    pais : {
        type : String,
        required : true
    }


})






module.exports = mongoose.model('Endereco',enderecoSchema)