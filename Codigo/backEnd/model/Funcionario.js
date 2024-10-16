const mongoose = require('mongoose');
const Schema = mongoose.Schema;


 const funcionarioSchema = new Schema({
    nome : {
        type : String,
        required : true
    },
    cargo : {
        type: String,
        required: true
    },
     email : {
        type : String,
        required : true
    },
     horas : {
        type : Number,
        required : true
    },
     salario : {
        type : Number,
        required : true
    },
     senha : {
        type : String,
        required : true
    }

 })


 module.exports = mongoose.model('Funcionario',funcionarioSchema)