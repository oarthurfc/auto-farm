const express = require('express');
const router = express.Router();

const enderecoController = require('../controller/EnderecoController');

router.post('/', enderecoController.createNewEndereco);
router.get('/', enderecoController.getAllEnderecos);
router.get('/:id', enderecoController.getEnderecoById);
router.put('/:id', enderecoController.updateEndereco);
router.delete('/:id', enderecoController.deleteEndereco);


module.exports = router;