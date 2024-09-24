const Pasto = require('../model/Pasto');

// Buscar todos os pastos
const getAllPastos = async (req, res) => {
    try {
        const pastos = await Pasto.find();
        if (!pastos.length) {
            return res.status(404).json({ message: 'Nenhum pasto encontrado' });
        }
        return res.json(pastos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar pastos' });
    }
};

// Criar um novo pasto
const createNewPasto = async (req, res) => {
    try {
        const result = await Pasto.create({
            nome: req.body.nome,
            tamanho: req.body.tamanho
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar pasto' });
    }
};

// Atualizar um pasto existente
const updatePasto = async (req, res) => {
    try {
        const pasto = await Pasto.findOne({ _id: req.body.id }).exec();

        if (!pasto) {
            return res.status(404).json({ message: `Nenhum pasto encontrado para o ID ${req.body.id}` });
        }

        if (req.body.nome) pasto.nome = req.body.nome;
        if (req.body.tamanho) pasto.tamanho = req.body.tamanho;

        const result = await pasto.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar pasto' });
    }
};

// Deletar um pasto
const deletePasto = async (req, res) => {
    try {
        if (!req?.body?.id) {
            return res.status(400).json({ message: 'O parâmetro ID é necessário' });
        }

        const pasto = await Pasto.findOne({ _id: req.body.id }).exec();

        if (!pasto) {
            return res.status(404).json({ message: `Nenhum pasto encontrado para o ID ${req.body.id}` });
        }

        const result = await pasto.deleteOne({ _id: req.body.id });
        res.json({ message: 'Pasto deletado com sucesso', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao deletar pasto' });
    }
};

// Buscar um pasto por ID
const getPastoById = async (req, res) => {
    try {
        if (!req?.params?.id) {
            return res.status(400).json({ message: 'O parâmetro ID é necessário' });
        }

        const pasto = await Pasto.findById(req.params.id).exec();

        if (!pasto) {
            return res.status(404).json({ message: `Nenhum pasto encontrado para o ID ${req.params.id}` });
        }

        res.json(pasto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar pasto por ID' });
    }
};

module.exports = {
    getAllPastos,
    createNewPasto,
    updatePasto,
    deletePasto,
    getPastoById
};
