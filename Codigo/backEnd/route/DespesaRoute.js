const express = require('express');
const router = express.Router();

const despesaController = require('../controller/DespesaController');

router.get('/', despesaController.getAllDespesas);
router.post('/', despesaController.createNewDespesa);
router.put('/:id', despesaController.updateDespesa);
router.delete('/:id', despesaController.deleteDespesa);
router.get('/:id', despesaController.getDespesaById);


module.exports = router;