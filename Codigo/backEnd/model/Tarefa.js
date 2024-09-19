const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tarefaSchema = new Schema({
    data : {
        type : Date,
        required : true
    },
    nome : {
        type : String,
        required : true
    },
})

module.exports = mongoose.model('Tarefa',tarefaSchema)