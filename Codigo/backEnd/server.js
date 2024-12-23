// Imports 
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { corsOptions } = require('./config/corsOptions');
const cors = require('cors');
const { verifyJWT } = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const { dbConnection } = require('./config/dbConnection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');

const PORT = process.env.PORT || 3500;

// Connect to the database
dbConnection();

// CORS = Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware to handle url-encoded data
app.use(express.urlencoded({ extended: false }));

// Middleware for JSON
app.use(express.json());

// Middleware for cookies parser
app.use(cookieParser());

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.get("/termos", (request, response) => {
    return response.json({
        message: "Termos de Serviço",
    });
});

// USER 
app.use('/auth', require('./route/AuthRoute'));
app.use('/register', require('./route/RegisterRoute'));
app.use(verifyJWT);
app.use('/refresh', require('./route/RefreshRoute'));
app.use('/logout', require('./route/LogoutRoute'));

// ANIMAL
app.use('/animal', require('./route/AnimalRoute'));
app.use('/lote', require('./route/LoteRoute'));
app.use('/historico', require('./route/HistoricoRoute'));

// COMPRADOR
app.use('/comprador', require('./route/CompradorRoute'));
app.use('/endereco', require('./route/EnderecoRoute'));

// FUNCIONÁRIO
app.use('/funcionario', require('./route/FuncionarioRoute'));
app.use('/tarefa', require('./route/TarefaRoute'));
app.use('/tarefaFuncionario', require('./route/TarefaFuncionarioRoute'));

// FINANCEIRO
app.use('/transacao', require('./route/TransacaoRoute'));
app.use('/despesa', require('./route/DespesaRoute'));

// PASTO
app.use('/pasto', require('./route/PastoRoute'));

// LEILÃO
app.use('/leilao', require('./route/LeilaoRoute')); // Adicionando a rota de leilão

mongoose.connection.once('open', () => {
    console.log('Connected to the MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});


// Production script
app.use(express.static(path.join(__dirname, "../front-end/auto-farm/dist")));   
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../front-end/auto-farm/dist", "index.html")); 
});
