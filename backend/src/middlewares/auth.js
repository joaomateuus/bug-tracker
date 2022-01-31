/**
 *File: auth.js
 *Description: arquivo responsável por confirmar se um user
 possui atutenticação p acessar determinado recurso
 *Data: 30/01/2022
 *Author: João Mateus
*/
const jwt = require('jsonwebtoken');

//Função try catch responsável pela autenticação
module.exports = (req, res, next) => {
    try {
        //var token q solicita o header http
        const token = req.headers.authorization.replace('Bearer ', '');
        console.log(token);
        //Aqui vamos validar o token e ver se o usuário está apto a logar
        const decoded = jwt.verify(token, 'secret');
        //decodifica a chave
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Falha na autenticação' });
    }
};
