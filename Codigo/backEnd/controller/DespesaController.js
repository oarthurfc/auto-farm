const Despesa = require('../model/Despesa');

// Buscar todas as despesas
const getAllDespesas = async (req, res) => {
    try {
        const despesas = await Despesa.find();
        if (!despesas.length) {
            return res.status(404).json({ message: 'Nenhuma despesa encontrada' });
        }
        return res.json(despesas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar despesas' });
    }
};

// Criar uma nova despesa
const createNewDespesa = async (req, res) => {
    try {
        const result = await Despesa.create({
            nome: req.body.nome,
            data: req.body.data,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            pagamento: req.body.pagamento,
            tipoDesepesa: req.body.tipoDesepesa
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar despesa' });
    }
};

// Atualizar uma despesa existente
const updateDespesa = async (req, res) => {
    try {
        const despesa = await Despesa.findOne({ _id: req.params.id }).exec();

        if (!despesa) {
            return res.status(404).json({ message: `Nenhuma despesa encontrada para o ID ${req.params.id}` });
        }

        if (req.body.nome) despesa.nome = req.body.nome;
        if (req.body.data) despesa.data = req.body.data;
        if (req.body.preco) despesa.preco = req.body.preco;
        if (req.body.quantidade) despesa.quantidade = req.body.quantidade;
        if (req.body.pagamento) despesa.pagamento = req.body.pagamento;
        if (req.body.tipoDesepesa) despesa.tipoDesepesa = req.body.tipoDesepesa;

        const result = await despesa.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar despesa' });
    }
};

// Deletar uma despesa
const deleteDespesa = async (req, res) => {
    try {
        if (!req?.params?.id) {
            return res.status(400).json({ message: 'O parâmetro ID é necessário' });
        }

        const despesa = await Despesa.findOne({ _id: req.params.id }).exec();

        if (!despesa) {
            return res.status(404).json({ message: `Nenhuma despesa encontrada para o ID ${req.params.id}` });
        }

        const result = await despesa.deleteOne({ _id: req.params.id });
        res.json({ message: 'Despesa deletada com sucesso', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao deletar despesa' });
    }
};

// Buscar uma despesa por ID
const getDespesaById = async (req, res) => {
    try {
        if (!req?.params?.id) {
            return res.status(400).json({ message: 'O parâmetro ID é necessário' });
        }

        const despesa = await Despesa.findById(req.params.id).exec();

        if (!despesa) {
            return res.status(404).json({ message: `Nenhuma despesa encontrada para o ID ${req.params.id}` });
        }

        res.json(despesa);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar despesa por ID' });
    }
};

module.exports = {
    getAllDespesas,
    createNewDespesa,
    updateDespesa,
    deleteDespesa,
    getDespesaById
};
