const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const sobreController = require('../controllers/sobreController')
const contatoController = require('../controllers/contatoController')
const postController = require('../controllers/postController');
const imageMiddleware = require('../middlewares/imageMiddleware')


// (nome do arquivo. nome da função criada no arquivo)

// rotas principais  
router.get('/' ,homeController.index)
router.get('/sobre', sobreController.sobreController) 
router.get('/contato', contatoController.contatoController) 


// rotas de adição
router.get('/post/add', postController.postAdd)  // rota de envio ate a pagina post
router.post('/post/add',
    imageMiddleware.upload, // midleware de upload de foto
    imageMiddleware.resize,  // middleware de redimencionamento de foto
    postController.addAction) // rota de recebimento dos dados do form

// rotas de edição 
router.get('/post/:slug/edit', postController.edit)// rota para edição de posts
router.post('/post/:slug/edit',  
imageMiddleware.upload, // midleware de upload de foto
imageMiddleware.resize,  // middleware de redimencionamento de foto
postController.editAction)
  
// rotas de visualização 

router.get('/post/:slug', postController.view) //    
  

module.exports = router;

// req.query = pega parametros enviados pelo metodo get
// req.body = pega parametros enviados pelo metodo post
// req.params = parametros da url 

