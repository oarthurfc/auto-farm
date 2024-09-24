const express = require('express');
const router = express.Router();

const tarefaFuncionarioController = require('../controller/TarefaFuncionarioController');


router.get('/', tarefaFuncionarioController.getAllTarefaFuncionario);
router.post('/', tarefaFuncionarioController.createNewTarefaFuncionario);
router.put('/:id', tarefaFuncionarioController.updateTarefaFuncionario);
router.delete('/:id', tarefaFuncionarioController.deleteTarefaFuncionario);
router.get('/:id', tarefaFuncionarioController.getTarefaFuncionarioById);


module.exports = router;