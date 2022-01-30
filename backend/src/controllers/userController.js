/**
 *File: userController.js
 *Description: arquivo controller controla todo fluxo de informaçoes da classe usuário
 *Data: 30/01/2022
 *Author: João Mateus
*/
//importando p usar algumas propiedades neste arquivo
const User = require('../models/userModel');

//==>Async e await Método responsável

//metodo do sign in
exports.signupNewUser = async (req, res) => {
    try {
        let isUser = await User.find({ usuario: req.body.usuario });
        console.log(isUser);

        //validação se registro existente
        if (isUser.length >= 1) {
            return res
            .status(409)
            .json({ message: 'Esse usuário já existe'})
        }
        
        //Registro de novos usuários
        const newUser = new User(req.body);
        const user = await newUser.save();
        const token = await newUser.generateAuthToken();
        return res
        .status(201)
        .json({ message: 'Usuário criado com sucesso', user, token });
    }  catch (err) {
        res.status(400).json({ err: err });
    }
};

//função reponsável pelo login
exports.loginUser = async (req, res) =>{
    try {
        const usuario = req.body.usuario;
        const senha = req.body.senha;
        const user = await User.findByCredentials(usuario, senha);
        
        //validação de usuário e senha
        if (!user) {
            return res.status(401).json({ error: 'Erro ao realizar o Login, verfique se usuário e senha estão corretos ' })
        }

        const token = await user.generateAuthToken();
        res.status(201).json({ message: 'Usuário(a) logado com sucesso!!', user, token });
        
    } catch (err) {
        res.status(400).json({ err: err })
    }
};

exports.returnUserHome= async (req, res) =>{};