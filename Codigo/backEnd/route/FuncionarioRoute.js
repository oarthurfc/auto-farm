const express = require('express');
const router = express.Router();

const funcionarioController = require('../controller/FuncionarioController');



router.get('/', funcionarioController.getAllFuncionarios);
router.post('/', funcionarioController.createNewFuncionario);
router.put('/:id', funcionarioController.updateFuncionario);
router.delete('/:id', funcionarioController.deleteFuncionario);
router.get('/:id', funcionarioController.getFuncionarioById);

module.exports = router;
