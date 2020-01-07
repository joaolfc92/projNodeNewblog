const express = require('express');
const app = express();
const router = require('./routes/index'); // importando o arquivo de rotas
const mustache = require('mustache-express') // importando template engine


// configurações
app.use('/', router); 

app.engine('mst', mustache(__dirname + '/views/partials','.mst')) // mst extenção do engine, e a função com a bibilhoteca 
app.set('view engine', 'mst'); // configurando a engine
app.set('views', __dirname + '/views'); // dizendo aonde irá estar os arquivos 

     

 
// rotas



module.exports = app; // exportando o arquivo app para ser usado no server.js