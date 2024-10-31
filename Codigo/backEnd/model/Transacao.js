const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipoTransacao = Object.freeze({
    VENDA: 'venda',
    COMPRA: 'compra'
});

const transacaoSchema = new Schema({
    tipoTransacao: {
        type: String,
        enum: Object.values(tipoTransacao),
        required: true,
        default: tipoTransacao.COMPRA
    },
    data: {
        type: Date,
        required: true
    },
    valorTotal: {
        type: Number,
        required: true
    },
    loteId: {
        type: Schema.Types.ObjectId,
        ref: 'Lote',
        required: true
    },
    valorArroba: {
        type: Number,
        required: false
    },
    nomeComprador: {
        type: String,
        required: true
    },
    pesoTotal: {
        type: Number,
        required: false
    },
    leilaoId: {
        type: Schema.Types.ObjectId,
        ref: 'Leilao',
        required: true
    },
    animais: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Animal',
            required: false
        }
    ]
});

Object.freeze(tipoTransacao);

module.exports = mongoose.model('Transacao', transacaoSchema);
