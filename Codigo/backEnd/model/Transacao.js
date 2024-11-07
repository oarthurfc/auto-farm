const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipoTransacao = Object.freeze({
    GANHO: 'ganho',
    GASTO: 'gasto'
});

const transacaoSchema = new Schema({
    tipoTransacao: {
        type: String,
        enum: Object.values(tipoTransacao),
        required: true,
        default: tipoTransacao.GANHO
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
        required: false
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
        required: false
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
