const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const loteSchema = new Schema({
    data : {
        type : Date,
        required : true
    },
    quantidade: {
        type: Number,
        required: true
    },
    valorTotal: {
        type: Number,
        required: true
    },
    animalId: {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    }
})

module.exports = mongoose.model('Lote',loteSchema)