const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pastoSchema = new Schema({
    nome : {
        type : String,
        required : true
    },
    dataInicial: {
        type: Date,
        default: Date.now
    },
    dataFinal: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('Pasto',pastoSchema)