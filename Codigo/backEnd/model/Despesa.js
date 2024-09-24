const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const despesaSchema = new Schema({
    nome:{
        type : String,
        required : true
    },
    data:{
        type : Date,
        required : true
    },
    preco:{
        type : Number,
        required : true
    },
    quantidade:{
        type : Number,
        required : true
    },
    pagamento:{
        type : String,
        required : true
    },
    tipoDesepesa:{
        type : String,
        required : true
    },

});


module.exports = mongoose.model('Despesa',despesaSchema)