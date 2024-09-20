const express = require('express');
const router = express.Router();

const tarefaController = require('../controller/TarefaController');

router.post('/', tarefaController.createNewTarefa);
router.get('/', tarefaController.getAllTarefas);
router.get('/:id', tarefaController.getTarefaById);
router.put('/:id', tarefaController.updateTarefa);
router.delete('/:id', tarefaController.deleteTarefa);


module.exports = router;