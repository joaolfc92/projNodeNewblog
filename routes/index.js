const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('home',{
        'nome':'joao',
        'idade':20,

        ingredientes :[
            {nome : 'fermento', qtd : '5g'},
            {nome: 'farinha', qtd: '500g'}
        ]
    });

   
})



module.exports = router;

// req.query = pega parametros enviados pelo metodo get
// req.body = pega parametros enviados pelo metodo post
// req.params = parametros da url 

