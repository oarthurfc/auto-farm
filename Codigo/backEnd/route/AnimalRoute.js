const express = require('express');
const router = express.Router();

const animalController = require('../controller/AnimalController');


router.get('/', animalController.getAllAnimals);
router.post('/', animalController.createNewAnimal);
router.get('/countByYear', animalController.getAnimalsCountByYear);
router.put('/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);
router.get('/:id', animalController.getAnimalById);

module.exports = router;
