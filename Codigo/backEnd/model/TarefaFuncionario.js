const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tarefaFuncionarioSchema = new Schema({

       tarefaId:{
        type: Schema.Types.ObjectId,
        ref: 'Tarefa',
        required: true
       }, 
       funcionarioId:{
        type: Schema.Types.ObjectId,
        ref: 'Funcionario',
        required: true
       }



})



module.exports = mongoose.model('TarefaFuncionario',tarefaFuncionarioSchema)