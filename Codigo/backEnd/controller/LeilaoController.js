const Leilao = require('../model/Leilao');

// Função para buscar todos os leilões
const getAllLeiloes = async (req, res) => {
    const leiloes = await Leilao.find();
    if (!leiloes || leiloes.length === 0) {
        return res.status(404).json({ "message": "Nenhum leilão encontrado." });
    }
    return res.json(leiloes);
};

// Função para criar um novo leilão
const createNewLeilao = async (req, res) => {
    try {
        const result = await Leilao.create({
            nome: req.body.nome,
            leiloeiro: req.body.leiloeiro,
            valorArrematado: req.body.valorArrematado
        });
        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao criar leilão." });
    }
};

// Função para atualizar um leilão existente
const updateLeilao = async (req, res) => {
    const leilao = await Leilao.findOne({ _id: req.body.id }).exec();
    if (!leilao) {
        return res.status(204).json({ "message": `Nenhum leilão encontrado com o ID ${req.body.id}.` });
    }

    // Atualizando os campos, se fornecidos
    if (req.body?.nome) leilao.nome = req.body.nome;
    if (req.body?.leiloeiro) leilao.leiloeiro = req.body.leiloeiro;
    if (req.body?.valorArrematado) leilao.valorArrematado = req.body.valorArrematado;

    const result = await leilao.save();
    return res.json(result);
};

// Função para deletar um leilão
const deleteLeilao = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const leilao = await Leilao.findOne({ _id: req.body.id }).exec();
    if (!leilao) {
        return res.status(204).json({ "message": `Nenhum leilão encontrado com o ID ${req.body.id}.` });
    }

    const result = await Leilao.deleteOne({ _id: req.body.id });
    return res.json(result);
};

// Função para buscar um leilão por ID
const getLeilaoById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const leilao = await Leilao.findById(req.params.id).exec();
    if (!leilao) {
        return res.status(204).json({ "message": `Nenhum leilão encontrado com o ID ${req.params.id}.` });
    }

    return res.json(leilao);
};

module.exports = {
    getAllLeiloes,
    createNewLeilao,
    updateLeilao,
    deleteLeilao,
    getLeilaoById
};
