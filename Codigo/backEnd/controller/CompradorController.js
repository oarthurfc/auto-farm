const Comprador = require('../model/Comprador');

// Função para buscar todos os compradores
const getAllCompradores = async (req, res) => {
    const compradores = await Comprador.find();
    if (!compradores || compradores.length === 0) {
        return res.status(404).json({ "message": "Nenhum comprador encontrado." });
    }
    return res.json(compradores);
};

// Função para criar um novo comprador
const createNewComprador = async (req, res) => {
    try {
        const result = await Comprador.create({
            nome: req.body.nome,
            email: req.body.email,
            cpfCnpj: req.body.cpfCnpj,
            registroLeilao: req.body.registroLeilao,
            pagamento: req.body.pagamento
        });
        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Erro ao criar comprador." });
    }
};

// Função para atualizar um comprador existente
const updateComprador = async (req, res) => {
    const comprador = await Comprador.findOne({ _id: req.body.id }).exec();
    if (!comprador) {
        return res.status(204).json({ "message": `Nenhum comprador encontrado com o ID ${req.body.id}.` });
    }

    // Atualizando os campos, se fornecidos
    if (req.body?.nome) comprador.nome = req.body.nome;
    if (req.body?.email) comprador.email = req.body.email;
    if (req.body?.cpfCnpj) comprador.cpfCnpj = req.body.cpfCnpj;
    if (req.body?.registroLeilao) comprador.registroLeilao = req.body.registroLeilao;
    if (req.body?.pagamento) comprador.pagamento = req.body.pagamento;

    const result = await comprador.save();
    return res.json(result);
};

// Função para deletar um comprador
const deleteComprador = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const comprador = await Comprador.findOne({ _id: req.body.id }).exec();
    if (!comprador) {
        return res.status(204).json({ "message": `Nenhum comprador encontrado com o ID ${req.body.id}.` });
    }

    const result = await Comprador.deleteOne({ _id: req.body.id });
    return res.json(result);
};

// Função para buscar um comprador por ID
const getCompradorById = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": "ID é necessário." });
    }

    const comprador = await Comprador.findById(req.params.id).exec();
    if (!comprador) {
        return res.status(204).json({ "message": `Nenhum comprador encontrado com o ID ${req.params.id}.` });
    }

    return res.json(comprador);
};

module.exports = {
    getAllCompradores,
    createNewComprador,
    updateComprador,
    deleteComprador,
    getCompradorById
};
