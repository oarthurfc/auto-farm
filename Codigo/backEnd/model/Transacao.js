const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tipoTransacao = Object.freeze({
    VENDA : 'venda',
    COMPRA : 'compra'
})
const transacaoSchema = new Schema({
    tipoTransacao : {
        type : String,
        enum : Object.values(tipoTransacao),
        required : true,
        default: tipoTransacao.COMPRA

    },
    data : {
        type : Date,
        required : true
    },
    preco : {
        type : Number,
        required : true
    },

})


Object.freeze(tipoTransacao)

module.exports = mongoose.model('Transacao',transacaoSchema)