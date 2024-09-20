const Tarefa = require('../model/Tarefa');

// Função para buscar todas as tarefas
const getAllTarefas = async (req, res) => {
    const tarefas = await Tarefa.find();
    if (!tarefas || tarefas.length === 0) {
        return res.status(404).json({ "message": "Nenhuma tarefa encontrada." });
    }
    return res.json(tarefas);
};

// Função para criar uma nova tarefa
const createNewTarefa = async (req, res) => {
    try {
        const result = await Tarefa.create({
            data: req.body.data,
            nome: req.body.nome
        });
        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao criar tarefa." });
    }
};

// Função para atualizar uma tarefa existente
const updateTarefa = async (req, res) => {
    const tarefa = await Tarefa.findOne({ _id: req.body.id }).exec();
    if (!tarefa) {
        return res.status(204).json({ "message": `Nenhuma tarefa encontrada com o ID ${req.body.id}.` });
    }

    // Atualizando os campos, se fornecidos
    if (req.body?.data) tarefa.data = req.body.data;
    if (req.body?.nome) tarefa.nome = req.body.nome;

    const result = await tarefa.save();
    return res.json(result);
};

// Função para deletar uma tarefa
const deleteTarefa = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const tarefa = await Tarefa.findOne({ _id: req.body.id }).exec();
    if (!tarefa) {
        return res.status(204).json({ "message": `Nenhuma tarefa encontrada com o ID ${req.body.id}.` });
    }

    const result = await Tarefa.deleteOne({ _id: req.body.id });
    return res.json(result);
};

// Função para buscar uma tarefa por ID
const getTarefaById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const tarefa = await Tarefa.findById(req.params.id).exec();
    if (!tarefa) {
        return res.status(204).json({ "message": `Nenhuma tarefa encontrada com o ID ${req.params.id}.` });
    }

    return res.json(tarefa);
};

module.exports = {
    getAllTarefas,
    createNewTarefa,
    updateTarefa,
    deleteTarefa,
    getTarefaById
};
