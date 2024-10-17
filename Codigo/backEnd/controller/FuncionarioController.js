const Funcionario = require('../model/Funcionario');

// Função para buscar todos os funcionários
const getAllFuncionarios = async (req, res) => {
    const funcionarios = await Funcionario.find();
    if (!funcionarios || funcionarios.length === 0) {
        return res.status(404).json({ "message": "Nenhum funcionário encontrado." });
    }
    return res.json(funcionarios);
};

// Função para criar um novo funcionário
const createNewFuncionario = async (req, res) => {
    try {
        const result = await Funcionario.create({
            nome: req.body.nome,
            cargo: req.body.cargo,
            email: req.body.email,
            horas: req.body.horas,
            salario: req.body.salario,
            senha: req.body.senha
        });
        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao criar funcionário." });
    }
};

// Função para atualizar um funcionário existente
const updateFuncionario = async (req, res) => {
    const funcionario = await Funcionario.findOne({ _id: req.params.id }).exec();
    if (!funcionario) {
        return res.status(204).json({ "message": `Nenhum funcionário encontrado com o ID ${req.body.id}.` });
    }

    // Atualizando os campos, se fornecidos
    if (req.body?.nome) funcionario.nome = req.body.nome;
    if (req.body?.cargo) funcionario.cargo = req.body.cargo;
    if (req.body?.email) funcionario.email = req.body.email;
    if (req.body?.horas) funcionario.horas = req.body.horas;
    if (req.body?.salario) funcionario.salario = req.body.salario;
    if (req.body?.senha) funcionario.senha = req.body.senha;

    const result = await funcionario.save();
    return res.json(result);
};

// Função para deletar um funcionário
const deleteFuncionario = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const funcionario = await Funcionario.findOne({ _id: req.params.id }).exec();
    if (!funcionario) {
        return res.status(204).json({ "message": `Nenhum funcionário encontrado com o ID ${req.body.id}.` });
    }

    const result = await Funcionario.deleteOne({ _id: req.params.id });
    return res.json(result);
};

// Função para buscar um funcionário por ID
const getFuncionarioById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }
    console.log("oii")
    const funcionario = await Funcionario.findById(req.params.id).exec();
    console.log("thacuu")
    if (!funcionario) {
        return res.status(204).json({ "message": `Nenhum funcionário encontrado com o ID ${req.params.id}.` });
    }

    return res.json(funcionario);
};

module.exports = {
    getAllFuncionarios,
    createNewFuncionario,
    updateFuncionario,
    deleteFuncionario,
    getFuncionarioById
};
