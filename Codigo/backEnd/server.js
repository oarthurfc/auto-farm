
// Imports 
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const {corsOptions} = require('./config/corsOptions');
const cors = require('cors');
const { verifyJWT } = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const { dbConnection } = require('./config/dbConnection');



const PORT = process.env.PORT || 3500;
//Connect to the database
dbConnection();

// CORS = Cross Origin Resource Sharing
app.use(cors(corsOptions));
//build-in middleware to handle url-encoded data
// in other words, it parses incoming requests with urlencoded payloads 
app.use(express.urlencoded({extended: false}));
// build-in middleware for json
app.use(express.json());

//middleware fore cookies parser

app.use(cookieParser());




app.use('/auth',require('./route/AuthRoute'));
app.use('/register',require('./route/RegisterRoute'));
app.use(verifyJWT);
app.use('/refresh',require('./route/RefreshRoute'));
app.use('/logout',require('./route/LogoutRoute'));
app.use('/animal',require('./route/AnimalRoute'));
app.use('/comprador',require('./route/CompradorRoute'));
app.use('/endereco',require('./route/EnderecoRoute'));
app.use('/funcionario',require('./route/FuncionarioRoute'));
app.use('/historico',require('./route/HistoricoRoute'));
app.use('/lote',require('./route/LoteRoute'));
app.use('/tarefa',require('./route/TarefaRoute'));
app.use('/transacao',require('./route/TransacaoRoute'));
 


 

    mongoose.connection.once('open', () => {
        console.log('Connected to the MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })


