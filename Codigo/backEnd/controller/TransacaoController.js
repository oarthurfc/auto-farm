const Transacao = require('../model/Transacao');

// Função para buscar todas as transações
const getAllTransacoes = async (req, res) => {
    try {
        const transacoes = await Transacao.find();
        if (!transacoes || transacoes.length === 0) {
            return res.status(404).json({ "message": "Nenhuma transação encontrada." });
        }
        return res.json(transacoes);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao buscar transações." });
    }
};

// Função para criar uma nova transação
const createNewTransacao = async (req, res) => {
    try {
        const result = await Transacao.create({
            tipoTransacao: req.body.tipoTransacao,
            data: req.body.data,
            preco: req.body.preco
        });
        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao criar transação." });
    }
};

// Função para atualizar uma transação existente
const updateTransacao = async (req, res) => {
    try {
        const transacao = await Transacao.findOne({ _id: req.body.id }).exec();
        if (!transacao) {
            return res.status(204).json({ "message": `Nenhuma transação encontrada com o ID ${req.body.id}.` });
        }

        // Atualizando os campos, se fornecidos
        if (req.body?.tipoTransacao) transacao.tipoTransacao = req.body.tipoTransacao;
        if (req.body?.data) transacao.data = req.body.data;
        if (req.body?.preco) transacao.preco = req.body.preco;

        const result = await transacao.save();
        return res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao atualizar transação." });
    }
};

// Função para deletar uma transação
const deleteTransacao = async (req, res) => {
    try {
        if (!req?.body?.id) {
            return res.status(400).json({ "message": "ID é necessário." });
        }

        const transacao = await Transacao.findOne({ _id: req.body.id }).exec();
        if (!transacao) {
            return res.status(204).json({ "message": `Nenhuma transação encontrada com o ID ${req.body.id}.` });
        }

        const result = await Transacao.deleteOne({ _id: req.body.id });
        return res.json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao deletar transação." });
    }
};

// Função para buscar uma transação por ID
const getTransacaoById = async (req, res) => {
    try {
        if (!req?.params?.id) {
            return res.status(400).json({ "message": "ID é necessário." });
        }

        const transacao = await Transacao.findById(req.params.id).exec();
        if (!transacao) {
            return res.status(204).json({ "message": `Nenhuma transação encontrada com o ID ${req.params.id}.` });
        }

        return res.json(transacao);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao buscar transação." });
    }
};

module.exports = {
    getAllTransacoes,
    createNewTransacao,
    updateTransacao,
    deleteTransacao,
    getTransacaoById
};
