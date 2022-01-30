/**
 *File: server.js
 *Description: arquivo responsável por toda config e execução da app
 *Data: 30/01/2022
 *Author: João Mateus
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');


const app = express();

//IMPORTANDO O ARQUIVO DATABASE
const database = require('./config/dbConfig');
mongoose.Promise = global.Promise;
//CONEXÃO COM BANCO:
mongoose.connect(database.local.localDatabaseUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(
    () => {
        console.log("A base de dados foi conectada com sucesso!");
    },
    (err) => {
        console.log(`Erro ao conectar com a base de dados...: ${err}`);
        process.exit();
});

//ROTAS ESTÃO NESSES ARQUIVO
const index = require('./routes/index');
const userRoutes = require('./routes/userRoutes');
const { Router } = require('express');
//ps: declarar a rota userroutes.js

app.use(express.urlencoded({ extended:true } ) );
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(morgan('dev'));


app.use(index);
//chamando pela rota v1 a rota user
app.use('/back/v1', userRoutes);


module.exports = app;