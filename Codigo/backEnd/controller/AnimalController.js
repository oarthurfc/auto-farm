const Animal = require('../model/Animal');

const getAllAnimals = async (req,res) => {
    const animals = await Animal.find()
    if(!animals){
        return res.status(404).json('Nenhum animal encontrados')
    }else
    return res.json(animals);
}


const createNewAnimal = async (req, res) => {
    try {
        const result = await Animal.create({
            nome : req.body.nome,
            sexo : req.body.sexo,
            nascimento : req.body.nascimento,
            raca : req.body.raca

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
    const animal =   Animal.findById(req.params.id).exec();                       
    if (!animal) {
        return res.status(204).json({ "message": `No animal mathces ID ${req.params.id}.` });
    }
    res.json(animal);
}

module.exports = {
    getAllAnimals,
    createNewAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimalById
}