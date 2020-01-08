const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const sobreController = require('../controllers/sobreController')
const contatoController = require('../controllers/contatoController')


// (nome do arquivo. nome da função criada no arquivo)

router.get('/',homeController.userLog ,homeController.index)
router.get('/sobre', sobreController.sobreController)
router.get('/contato', contatoController.contatoController)  




module.exports = router;

// req.query = pega parametros enviados pelo metodo get
// req.body = pega parametros enviados pelo metodo post
// req.params = parametros da url 

