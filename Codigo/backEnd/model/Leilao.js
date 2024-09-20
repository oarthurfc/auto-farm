const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const leialoSchema = new Schema({
    nome : {
        type : String,
        required : true
    },
    leiloeiro : {
        type : String,
        required : true
    },
    valorArrematado : {
        type : Number,
        required : true
    },
})

module.exports = mongoose.model('Leilao',leialoSchema)