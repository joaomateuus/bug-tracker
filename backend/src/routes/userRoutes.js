/**
 *File: userRoutes.js
 *Description: arquivo responsável por listar todas as rotas do user
 *Data: 30/01/2022
 *Author: João Mateus
*/

const express = require('express');
const router = express.Router();
//importando p implementar nas rotas a lógica usada no controller
const userController = require('../controllers/userController');

//==>Rotas responsável por criar um novo usuário 
//(POST)localhost:3000/back/v1/signup
router.post('/signup', userController.signupNewUser);

//==>Rota de login
router.post('/login', userController.loginUser);

//==>Rota de requisição para home
router.get('/home', userController.returnUserHome);

module.exports = router;