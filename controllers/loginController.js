const User = require('../models/User')


exports.loginController = (req,res) =>{    
    res.render('login')
}  


exports.loginAction = (req,res) =>{
    const auth = User.authenticate()

    auth(req.body.email, req.body.password, (error,result) =>{
        if(!result){
            req.flash('error', 'Seu email ou senha estão incorretos')
            res.redirect('/users/login')  
            return;
        }

        req.login(result, ()=>{});

        req.flash('sucess', "Login feito com sucesso")
        res.redirect('/')
    })
}

exports.register = (req,res) =>{ 
   res.render('register')
}  

exports.registerAction = (req,res) =>{
    const newUser = new User(req.body)
    User.register(newUser , req.body.password, (error)=>{
        if(error){
            req.flash('error', 'Error'+error.message)

            res.redirect('/users/register')
            return
        }
        req.flash('sucess','Usuário cadastrado com sucesso. Faça o login');
        res.redirect('/users/login') 
    })

}