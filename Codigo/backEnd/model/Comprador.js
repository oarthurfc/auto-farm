const mongoose = require('mongoose');
const Leilao = require('./Leilao');
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
    },
    enderecoId : {
        type : Schema.Types.ObjectId,
        ref: 'Endereco',
        required : true
    },
    leilaoId : {
        type : Schema.Types.ObjectId,
        ref: 'Leilao',
        required : true
    }
    



})

Object.freeze(tipoPagamento);




module.exports = mongoose.model('Comprador',compradorSchema)