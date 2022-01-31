/**
 *File: mongooseCon.js
 *Description: arquivo responsável por toda config e execução da app
 *Data: 30/01/2022
 *Author: João Mateus
 */
const express = require('express');
const mongoose = require('mongoose');

const database = require('./dbConfig');

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