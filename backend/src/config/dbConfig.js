/**
 *File: dbConfig.js
 *Description: arquivo responsável por fzr a conexão de dados com o mongodb
 *Data: 30/01/2022
 *Author: João Mateus
 */
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    local: {
        localDatabaseUrl: process.env.DB_URI,
        secret: "password",
    }
};
