const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController') 
const postController = require('../controllers/postController');
const imageMiddleware = require('../middlewares/imageMiddleware')


// (nome do arquivo. nome da função criada no arquivo)

// rotas principais  
router.get('/' ,homeController.index) 
router.get('/users/login', loginController.loginController) 
router.get('/users/register', loginController.register)
router.post('/users/register', loginController.registerAction) 


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

