const express = require('express');
const router = express.Router();

const historicoController = require('../controller/HistoricoController');


router.post('/', historicoController.createNewHistorico);
router.get('/', historicoController.getAllHistoricos);
router.get('/:id', historicoController.getHistoricoById);
router.put('/:id', historicoController.updateHistorico);
router.delete('/:id', historicoController.deleteHistorico);

module.exports = router;