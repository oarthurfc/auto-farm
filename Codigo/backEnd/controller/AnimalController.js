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
        console.error(err);
    }                                                  
    data.setAnimals([...data.animals, newEmployee]);
    res.status(201).json(data.animals);
}

const updateAnimal = async (req, res) => {                                                       

    const animal = await Animal.findOne({ _id : req.body.id}).exec();

    if (!animal) {
        return res.status(204).json({ "message": `No animal mathces ID ${req.body.id}.` });
    }
    if (req.body?.nome) animal.nome = req.body.nome;
    if (req.body?.raca) animal.lastname = req.body.raca;
    if (req.body?.sexo) animal.sexo = req.body.sexo;
    if (req.body?.nascimento) animal.nascimento = req.body.nascimento;
                                                                            
    res.json(result);
}

const deleteAnimal = (req, res) => {

    if(!req?.body?.id){
        return res.status(400).json({'message': `ID paramater is required`})
    }
    const animal = Animal.findOne({_id :req.body.id }).exec();
    if (!animal) {
        return res.status(204).json({ "message": `No animal mathces ID ${req.body.id}.` });
    }
    const result = animal.deleteOne({_id: req.body.id})                                        
                                           ;
    res.json(data.animal);
}

const getAnimalById = (req, res) => {
            //params is beacuse the id come for query URL
    if(!req?.params?.id){
        return res.status(400).json({'message': `ID paramater is required`})
    }
   try{
    const animal =   Animal.findById(req.params.id)
    .populate('pastoId')
    .exec();                       
    if (!animal) {
        return res.status(204).json({ "message": `No animal mathces ID ${req.params.id}.` });
    }
    res.json(animal);
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