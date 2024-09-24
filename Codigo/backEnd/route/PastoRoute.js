const express = require('express');
const router = express.Router();

const pastoController = require('../controller/PastoController');


router.get('/', pastoController.getAllPastos);
router.post('/', pastoController.createNewPasto);
router.put('/:id', pastoController.updatePasto);
router.delete('/:id', pastoController.deletePasto);
router.get('/:id', pastoController.getPastoById);

module.exports = router;