const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipoPagamento = Object.freeze({
    DEBITO : 'debito',
    CREDITO: 'credito',
    DINHEIRO : 'dinheiro',
    PIX : 'pix',
    BOLETO : 'boleto'
})
const compradorSchema = new Schema({
    
    nome : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true

    },
    cpfCnpj : {
        type : String,
        required : true

    },
    registroLeilao : {
        type : Number,
        required : true
    },
    pagamento : {
        type : String,
        enum : Object.values(tipoPagamento),
        required : true
    }



})

Object.freeze(tipoPagamento);




module.exports = mongoose.model('Comprador',compradorSchema)