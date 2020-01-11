
const mongoose = require('mongoose');


require('dotenv').config({path:'variables.env'})

// CONEXÃO AO BANCO DE DADOS COM MONGOOSE
mongoose.connect(process.env.DATABASE,  { useNewUrlParser: true, useFindAndModify:false });
mongoose.Promise = global.Promise;
mongoose.connection.on('error',(error)=>{
    console.error('Erro'+error.message) 
}) 


// carregando os MODELS

require('./models/Post');


const app = require('./app'); // importando o arquivo app.js
//CONEXÃO COM SERVIDOR
app.set('port', process.env.PORT || 8081); // (nome da função + estou importando o arquivo variables.env, com as configurações de ambiente)

const server = app.listen(app.get('port'), ()=>{
    console.log('http://localhost:'+server.address().port) // dizendo ao servidor em qual porta rodar
})