const Historico = require('../model/Historico');

// Função para buscar todos os históricos
const getAllHistoricos = async (req, res) => {
    try{
        const historicos = await Historico.find()
        .populate('animalId')
        .exec();
        if (!historicos || historicos.length === 0) {
            return res.status(404).json({ "message": "Nenhum histórico encontrado." });
        }
        return res.json(historicos);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao buscar históricos." });
    }
   
};

// Função para criar um novo histórico
const createNewHistorico = async (req, res) => {
    try {
        const result = await Historico.create({
            data: req.body.data,
            peso: req.body.peso,
            tratamento: req.body.tratamento,
            local: req.body.local,
            tamanho: req.body.tamanho,
            animalId: req.body.animalId
        });
        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao criar histórico." });
    }
};

// Função para atualizar um histórico existente
const updateHistorico = async (req, res) => {
    const historico = await Historico.findOne({ _id: req.body.id }).exec();
    if (!historico) {
        return res.status(204).json({ "message": `Nenhum histórico encontrado com o ID ${req.body.id}.` });
    }

    // Atualizando os campos, se fornecidos
    if (req.body?.data) historico.data = req.body.data;
    if (req.body?.peso) historico.peso = req.body.peso;
    if (req.body?.tratamento) historico.tratamento = req.body.tratamento;
    if (req.body?.local) historico.local = req.body.local;
    if (req.body?.tamanho) historico.tamanho = req.body.tamanho;

    const result = await historico.save();
    return res.json(result);
};

// Função para deletar um histórico
const deleteHistorico = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const historico = await Historico.findOne({ _id: req.body.id }).exec();
    if (!historico) {
        return res.status(204).json({ "message": `Nenhum histórico encontrado com o ID ${req.body.id}.` });
    }

    const result = await Historico.deleteOne({ _id: req.body.id });
    return res.json(result);
};

// Função para buscar um histórico por ID
const getHistoricoById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    try{
        const historico = await Historico.findById(req.params.id)
        .populate('animalId')
        .exec();
    if (!historico) {
        return res.status(204).json({ "message": `Nenhum histórico encontrado com o ID ${req.params.id}.` });
    }

    return res.json(historico);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao buscar histórico." });
    }
};

module.exports = {
    getAllHistoricos,
    createNewHistorico,
    updateHistorico,
    deleteHistorico,
    getHistoricoById
};
