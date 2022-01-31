/**
 *File: app.js
 *Description: arquivo responsável por toda config e execução da app
 *Data: 30/01/2022
 *Author: João Mateus
 */
//dependencias 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
//arquivos
const mongooseConnection = require('./config/mongooseCon');
//arquivos p rota
const index = require('./routes/index');
const userRoutes = require('./routes/userRoutes');

//chamada p app
const app = express();

//fazendo chamadas p dependiencias 
app.use(express.urlencoded({ extended:true } ) );
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(morgan('dev'));

//chamada p conexão c banco de dados
app.set('mongoose connection', mongooseConnection);

//chamadas p rota
app.use(index);
//chamando pela rota v1 a rota user
app.use('/back/v1', userRoutes);


module.exports = app;