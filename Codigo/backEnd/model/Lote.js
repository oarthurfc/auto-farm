const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const loteSchema = new Schema({
    data : {
        type : Date,
        required : true
    },
})

module.exports = mongoose.model('Lote',loteSchema)