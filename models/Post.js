const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



// CRIANDO A ESTRUTURA DOS POST NO BANCO DE DADOS
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:"Preencha o campo titulo"
    },

    slug:{
        type:String
    },

    body:{
        type:String,
        trim:true
    },

    tags:[String]


});


module.exports = mongoose.model('Post', postSchema);