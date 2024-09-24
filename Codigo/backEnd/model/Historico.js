const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historicoSchema = new Schema({
    data : {
        type : Date,
        required : true
    },
    peso : {
        type : Number,
        required : true
    },
    tratamento : {
        type : String,
        required : true
    },
    local : {
        type : String,
        required : true
    },
    tamanho : {
        type : Number,
        required : true
    },
    animalId: {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
        required: true


    }
    

    
})


module.exports = mongoose.model('Historico',historicoSchema)