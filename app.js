const express = require('express'); 
const app = express(); 
const router = require('./routes/index'); // importando o arquivo de rotas
const mustache = require('mustache-express') // importando template engine
const helpers = require('./helpers') // importando o arquivo de helpers
const errorHandler= require('./handlers/errorHandler') // importando arquivo de ERRO
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('express-session')   

    
 
// configurações 

    // css/js/image
    app.use(express.static(__dirname+'/public'))

    // MUSTACHE
app.engine('mst', mustache(__dirname + '/views/partials','.mst')) // mst extenção do engine, e a função com a bibilhoteca 
app.set('view engine', 'mst'); // configurando a engine
app.set('views', __dirname + '/views'); // dizendo aonde irá estar os arquivos 

    // arquivos json 
app.use(express.json())  
app.use(express.urlencoded({extended:true}))    

    // cookie
 app.use(cookieParser(process.env.SECRET))
 
    // session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized:false

}))    


    

 
    // flash
app.use(flash());    

     

    
// ROTAS

    // importando a rota helpers sempre antes de todas as rotas

    // carregando arquivo helpers
app.use((req,res,next)=>{
    res.locals.h = helpers; // criando variaveis globais 
    res.locals.flashes = req.flash();
    next();
})

// Arquivo de rota principal
app.use('/', router); 

app.use(errorHandler.notFound) // nome da função com arquivo.nome da função dentro do arquivo

module.exports = app; // exportando o arquivo app para ser usado no server.js 