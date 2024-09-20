const express = require('express');
const router = express.Router();

const loteController = require('../controller/LoteController');

router.post('/', loteController.createNewLote);
router.get('/', loteController.getAllLotes);
router.get('/:id', loteController.getLoteById);
router.put('/:id', loteController.updateLote);
router.delete('/:id', loteController.deleteLote);


module.exports = router;
