const Endereco = require('../model/Endereco');

// Função para buscar todos os endereços
const getAllEnderecos = async (req, res) => {
    const enderecos = await Endereco.find();
    if (!enderecos || enderecos.length === 0) {
        return res.status(404).json({ "message": "Nenhum endereço encontrado." });
    }
    return res.json(enderecos);
};

// Função para criar um novo endereço
const createNewEndereco = async (req, res) => {
    try {
        const result = await Endereco.create({
            cep: req.body.cep,
            rua: req.body.rua,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            pais: req.body.pais
        });
        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao criar endereço." });
    }
};

// Função para atualizar um endereço existente
const updateEndereco = async (req, res) => {
    const endereco = await Endereco.findOne({ _id: req.body.id }).exec();
    if (!endereco) {
        return res.status(204).json({ "message": `Nenhum endereço encontrado com o ID ${req.body.id}.` });
    }

    // Atualizando os campos, se fornecidos
    if (req.body?.cep) endereco.cep = req.body.cep;
    if (req.body?.rua) endereco.rua = req.body.rua;
    if (req.body?.bairro) endereco.bairro = req.body.bairro;
    if (req.body?.cidade) endereco.cidade = req.body.cidade;
    if (req.body?.estado) endereco.estado = req.body.estado;
    if (req.body?.pais) endereco.pais = req.body.pais;

    const result = await endereco.save();
    return res.json(result);
};

// Função para deletar um endereço
const deleteEndereco = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const endereco = await Endereco.findOne({ _id: req.body.id }).exec();
    if (!endereco) {
        return res.status(204).json({ "message": `Nenhum endereço encontrado com o ID ${req.body.id}.` });
    }

    const result = await Endereco.deleteOne({ _id: req.body.id });
    return res.json(result);
};

// Função para buscar um endereço por ID
const getEnderecoById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const endereco = await Endereco.findById(req.params.id).exec();
    if (!endereco) {
        return res.status(204).json({ "message": `Nenhum endereço encontrado com o ID ${req.params.id}.` });
    }

    return res.json(endereco);
};

module.exports = {
    getAllEnderecos,
    createNewEndereco,
    updateEndereco,
    deleteEndereco,
    getEnderecoById
}