const Animal = require('../model/Animal');

const getAllAnimals = async (req,res) => {
    try{
        const animals = await Animal.find()
        .populate('pastoId')
        .exec();
    if (!animals || animals.length === 0) {
        return res.status(404).json({ "message": "Nenhum animal encontrado." });
    }
    return res.json(animals);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao buscar animais." });
    
}
}


const createNewAnimal = async (req, res) => {
    try {
        const result = await Animal.create({
            nome : req.body.nome,
            sexo : req.body.sexo,
            nascimento : req.body.nascimento,
            raca : req.body.raca,
            pastoId: req.body.pastoId

        });
        res.status(201).json(result);
        
    } catch (err) {
        res.status(400).json({"message": "All statements required"})
        console.error(err);
    }                                                  
    
}

const updateAnimal = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);

        if (!animal) {
            return res.status(404).json({ "message": `No animal matches ID ${req.params.id}.` });
        }

        if (req.body?.nome) animal.nome = req.body.nome;
        if (req.body?.raca) animal.raca = req.body.raca; 
        if (req.body?.sexo) animal.sexo = req.body.sexo;
        if (req.body?.nascimento) animal.nascimento = req.body.nascimento;

        const result = await animal.save();

        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao atualizar animal:", error);
        res.status(500).json({ "message": "Erro ao atualizar animal." });
    }
};

const deleteAnimal = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }

    const animal = await Animal.findById(req.params.id);
    
    if (!animal) {
        return res.status(404).json({ "message": `No animal matches ID ${req.params.id}.` });
    }

    await animal.deleteOne();

    res.status(200).json({ "message": `Animal with ID ${req.params.id} deleted successfully.` });
};

const getAnimalById = async (req, res) => {
            //params is beacuse the id come for query URL
    if(!req?.params?.id){
        return res.status(400).json({'message': `ID paramater is required`})
    }
   try{
    const animal =  await Animal.findById(req.params.id)
    .populate('pastoId')
    .exec();                       
    if (!animal) {
        return res.status(204).json({ "message": `No animal mathces ID ${req.params.id}.` });
    }
    return res.json(animal);
   }
    catch(err){
     console.error(err);
     return res.status(500).json({ "message": "Erro ao buscar animal." });
    }
}

module.exports = {
    getAllAnimals,
    createNewAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimalById
}