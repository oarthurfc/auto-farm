const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pastoSchema = new Schema({
    nome : {
        type : String,
        required : true
    },
    tamanho : {
        type : Number,
        required : true
    },
})

module.exports = mongoose.model('Pasto',pastoSchema)