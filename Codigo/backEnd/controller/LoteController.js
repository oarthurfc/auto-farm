const Lote = require('../model/Lote');

// Função para buscar todos os lotes
const getAllLotes = async (req, res) => {
    const lotes = await Lote.find();
    if (!lotes || lotes.length === 0) {
        return res.status(404).json({ "message": "Nenhum lote encontrado." });
    }
    return res.json(lotes);
};

// Função para criar um novo lote
const createNewLote = async (req, res) => {
    try {
        const result = await Lote.create({
            data: req.body.data
        });
        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao criar lote." });
    }
};

// Função para atualizar um lote existente
const updateLote = async (req, res) => {
    const lote = await Lote.findOne({ _id: req.body.id }).exec();
    if (!lote) {
        return res.status(204).json({ "message": `Nenhum lote encontrado com o ID ${req.body.id}.` });
    }

    // Atualizando os campos, se fornecidos
    if (req.body?.data) lote.data = req.body.data;

    const result = await lote.save();
    return res.json(result);
};

// Função para deletar um lote
const deleteLote = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const lote = await Lote.findOne({ _id: req.body.id }).exec();
    if (!lote) {
        return res.status(204).json({ "message": `Nenhum lote encontrado com o ID ${req.body.id}.` });
    }

    const result = await Lote.deleteOne({ _id: req.body.id });
    return res.json(result);
};

// Função para buscar um lote por ID
const getLoteById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const lote = await Lote.findById(req.params.id).exec();
    if (!lote) {
        return res.status(204).json({ "message": `Nenhum lote encontrado com o ID ${req.params.id}.` });
    }

    return res.json(lote);
};

module.exports = {
    getAllLotes,
    createNewLote,
    updateLote,
    deleteLote,
    getLoteById
};
