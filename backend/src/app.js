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

//ROTAS
const index = require('./routes/index');
//ps: declarar a rota userroutes.js

app.use(express.urlencoded({ extended:true } ) );
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(morgan('dev'));

app.use(index);
//ps: incluir chamda de userorutes.js

module.exports = app;