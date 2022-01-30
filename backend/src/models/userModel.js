/**
 *File: userModel.js
 *Description: arquivo responsável pelo modelo da classe 'users' usando o mongoose
 *Data: 30/01/2022
 *Author: João Mateus
*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

//variavel com schema do banco
const userSchema = new Schema(
    {
        usuario: {type: String, maxlength: 50, required: true},
        senha: {type: String, maxlength: 200, required: true},
        tokens: 
    [{
        token: {type: String, required: true}
    }]
    }, 
    {
    timestamps: true,
    collection:'users',
    }
);

//métodos de Schema do mongoose

//Esse vai fzr o hash da senha antes de salvar a classe do model user
userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('senha')) {
        user.senha = await bcrypt.hash(user.senha, 8);
    }
    next();
});

//metodo vai gerar uma autent. auth p user 
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id, usuario: user.usuario}, 'secret');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

//faz pesquisa com parametros
userSchema.statics.findByCredentials = async (usuario, senha) => {
    const user = await User.findOne({ usuario });
    console.log(user);
    //validação p usuario  
    if(!user) {
        throw new Error({ error: 'Login inválido' });
    }
    //validação p senha
    const isPasswordMatch = await bcrypt.compare(senha, user.senha);

    if(!isPasswordMatch) {
        throw new Error({ error: 'Senha inválida' });
    }
    return user
};

const User = mongoose.model('User', userSchema);

//exportando pq vamos usar em outros arquivos
module.exports = User;