const express = require('express');
const router = express.Router();

const compradorController = require('../controller/CompradorController');

router.get('/', compradorController.getAllCompradores);
router.get('/:id', compradorController.getCompradorById);
router.post('/', compradorController.createNewComprador);
router.put('/:id', compradorController.updateComprador);
router.delete('/:id', compradorController.deleteComprador);


module.exports = router;