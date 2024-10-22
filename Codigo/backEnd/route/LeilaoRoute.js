const express = require('express');
const router = express.Router();

const leilaoController = require('../controller/LeilaoController');

// Criar um novo leilão
router.post('/', leilaoController.createNewLeilao);

// Obter todos os leilões
router.get('/', leilaoController.getAllLeiloes);

// Obter um leilão específico por ID
router.get('/:id', leilaoController.getLeilaoById);

// Atualizar um leilão específico por ID
router.put('/:id', leilaoController.updateLeilao);

// Excluir um leilão específico por ID
router.delete('/:id', leilaoController.deleteLeilao);

module.exports = router;
