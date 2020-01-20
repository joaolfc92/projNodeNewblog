const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController') 
const postController = require('../controllers/postController');
const imageMiddleware = require('../middlewares/imageMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');


// (nome do arquivo. nome da função criada no arquivo)

// rotas principais  
router.get('/' ,homeController.index) 
router.get('/users/login', loginController.loginController) 
router.post('/users/login', loginController.loginAction)
router.get('/users/logout', loginController.logoutAction)

router.get('/users/register', loginController.register)
router.post('/users/register', loginController.registerAction) 

router.get('/users/forget', loginController.forget);
router.post('/users/forget', loginController.forgetAction)

router.get('/users/reset/:token', loginController.forgetToken)
router.post('/users/reset/:token', loginController.forgetTokenAction)


router.get('/profile', authMiddleware.isLogged , loginController.profile)
router.post('/profile', authMiddleware.isLogged , loginController.profileAction)

router.post('/profile/password',  authMiddleware.isLogged , authMiddleware.changePAssword)


// rotas de adição
router.get('/post/add', authMiddleware.isLogged ,postController.postAdd)  // rota de envio ate a pagina post
router.post('/post/add', 
    authMiddleware.isLogged,
    imageMiddleware.upload, // midleware de upload de foto
    imageMiddleware.resize,  // middleware de redimencionamento de foto
    postController.addAction) // rota de recebimento dos dados do form 

// rotas de edição 
router.get('/post/:slug/edit' , authMiddleware.isLogged , postController.edit)// rota para edição de posts
router.post('/post/:slug/edit',  
authMiddleware.isLogged,
imageMiddleware.upload, // midleware de upload de foto
imageMiddleware.resize,  // middleware de redimencionamento de foto
postController.editAction)
  
// rotas de visualização 

router.get('/post/:slug', postController.view) //    
  

module.exports = router;

// req.query = pega parametros enviados pelo metodo get
// req.body = pega parametros enviados pelo metodo post
// req.params = parametros da url 

