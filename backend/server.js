/**
 *File: server.js
 *Description: arquivo responsável por toda config e execução da app
 *Data: 30/01/2022
 *Author: João Mateus
 */

 const app = require ('./src/app');
 const port = process.env.PORT || 3000;

 app.listen(port, ()=>{
     console.log("Aplicação está sendo executada na porta:", port);
 });

 