const express = require('express');
const router = express.Router();

const transacaoController = require('../controller/TransacaoController');

router.post('/', transacaoController.createNewTransacao);
router.get('/', transacaoController.getAllTransacoes);
router.put('/:id', transacaoController.updateTransacao);
router.delete('/:id', transacaoController.deleteTransacao);
router.get('/:id', transacaoController.getTransacaoById);


module.exports = router;
