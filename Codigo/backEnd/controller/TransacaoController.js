const Transacao = require('../model/Transacao');

// Função para buscar todas as transações
const getAllTransacoes = async (req, res) => {
    try {
        const transacoes = await Transacao.find()
        .populate('loteId')
        .populate('leilaoId')
        .exec();
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
const mapTransacaoFields = (target, source) => {
    const fields = ['tipoTransacao', 'data', 'valorTotal', 'loteId', 'valorArroba', 'nomeComprador', 'pesoTotal', 'leilaoId', 'animais'];
    fields.forEach(field => {
        target[field] = source[field] !== undefined ? source[field] : null;
    });
};

// Controlador para criar uma nova transação
const createNewTransacao = async (req, res) => {
    try {
        const transacaoData = {};
        
        // Mapeando os campos de req.body para transacaoData
        mapTransacaoFields(transacaoData, req.body);

        // Cria a transação com os dados mapeados
        const transacao = new Transacao(transacaoData);
        await transacao.save();

        // Relaciona cada Animal com a transação (se necessário)
        if (transacaoData.animais && transacaoData.animais.length > 0) {
            await Animal.updateMany(
                { _id: { $in: transacaoData.animais } },
                { transacaoId: transacao._id }
            );
        }

        res.status(201).json(transacao);
    } catch (error) {
        console.error('Erro ao criar transação:', error);
        res.status(500).json({ message: 'Erro ao criar transação.' });
    }
};
// Controlador para atualizar uma transação existente
const updateTransacao = async (req, res) => {
    try {
        const transacao = await Transacao.findOne({ _id: req.body.id }).exec();
        if (!transacao) {
            return res.status(204).json({ "message": `Nenhuma transação encontrada com o ID ${req.body.id}.` });
        }

        // Atualiza a transação usando a função de mapeamento
        mapTransacaoFields(transacao, req.body);

        const result = await transacao.save();
        return res.json(result);
    } catch (err) {
        console.error("Erro ao atualizar transação:", err.message);
        return res.status(500).json({ message: "Erro ao atualizar transação." });
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

        const transacao = await Transacao.findById(req.params.id)
            .populate('loteId')
            .populate('leilaoId')
            .exec();
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