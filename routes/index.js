const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const sobreController = require('../controllers/sobreController')
const contatoController = require('../controllers/contatoController')
const postController = require('../controllers/postController');


// (nome do arquivo. nome da função criada no arquivo)

router.get('/' ,homeController.index)
router.get('/sobre', sobreController.sobreController)
router.get('/contato', contatoController.contatoController) 
router.get('/post/add', postController.postAdd)  // rota de envio ate a pagina post
router.post('/post/add', postController.addAction) // rota de recebimento dos dados do form





module.exports = router;

// req.query = pega parametros enviados pelo metodo get
// req.body = pega parametros enviados pelo metodo post
// req.params = parametros da url 

