const TarefaFuncionario = require('../model/TarefaFuncionario');

// Função para obter todas as tarefas-funcionários
const getAllTarefaFuncionario = async (req, res) => {
    try {
        const tarefasFuncionarios = await TarefaFuncionario.find()
            .populate('tarefaId')
            .populate('funcionarioId')
            .exec();

        if (!tarefasFuncionarios || tarefasFuncionarios.length === 0) {
            return res.status(404).json('Nenhuma tarefa-funcionário encontrada');
        }
        res.json(tarefasFuncionarios);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': 'Erro ao buscar tarefas-funcionários' });
    }
};

// Função para criar um novo relacionamento entre tarefa e funcionário
const createNewTarefaFuncionario = async (req, res) => {
    try {
        const { tarefaId, funcionarioId } = req.body;

        if (!tarefaId || !funcionarioId) {
            return res.status(400).json({ 'message': 'ID de tarefa e funcionário são obrigatórios' });
        }

        const newTarefaFuncionario = await TarefaFuncionario.create({
            tarefaId: tarefaId,
            funcionarioId: funcionarioId
        });

        res.status(201).json(newTarefaFuncionario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': 'Erro ao criar tarefa-funcionário' });
    }
};

// Função para atualizar uma tarefa-funcionário
const updateTarefaFuncionario = async (req, res) => {
    try {
        const tarefaFuncionario = await TarefaFuncionario.findById(req.body.id).exec();

        if (!tarefaFuncionario) {
            return res.status(404).json({ 'message': `Nenhuma tarefa-funcionário encontrada com o ID ${req.body.id}` });
        }

        if (req.body?.tarefaId) tarefaFuncionario.tarefaId = req.body.tarefaId;
        if (req.body?.funcionarioId) tarefaFuncionario.funcionarioId = req.body.funcionarioId;

        const result = await tarefaFuncionario.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': 'Erro ao atualizar tarefa-funcionário' });
    }
};

// Função para deletar um relacionamento entre tarefa e funcionário
const deleteTarefaFuncionario = async (req, res) => {
    try {
        if (!req?.body?.id) {
            return res.status(400).json({ 'message': 'ID é obrigatório para deletar tarefa-funcionário' });
        }

        const tarefaFuncionario = await TarefaFuncionario.findById(req.body.id).exec();

        if (!tarefaFuncionario) {
            return res.status(404).json({ 'message': `Nenhuma tarefa-funcionário encontrada com o ID ${req.body.id}` });
        }

        const result = await TarefaFuncionario.deleteOne({ _id: req.body.id });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': 'Erro ao deletar tarefa-funcionário' });
    }
};

// Função para obter um relacionamento por ID
const getTarefaFuncionarioById = async (req, res) => {
    try {
        if (!req?.params?.id) {
            return res.status(400).json({ 'message': 'ID é obrigatório' });
        }

        const tarefaFuncionario = await TarefaFuncionario.findById(req.params.id)
            .populate('tarefaId')
            .populate('funcionarioId')
            .exec();

        if (!tarefaFuncionario) {
            return res.status(404).json({ 'message': `Nenhuma tarefa-funcionário encontrada com o ID ${req.params.id}` });
        }

        res.json(tarefaFuncionario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': 'Erro ao buscar tarefa-funcionário' });
    }
};

module.exports = {
    getAllTarefaFuncionario,
    createNewTarefaFuncionario,
    updateTarefaFuncionario,
    deleteTarefaFuncionario,
    getTarefaFuncionarioById
};
