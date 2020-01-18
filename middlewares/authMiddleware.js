exports.isLogged = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', "Ops, FAça o login para continuar")
        res.redirect('/users/login')
        return
    }

    next();
}


exports.changePAssword = (req,res) =>{
    // confirmar que as senhas batem

    if(req.body.password != req.body['password-confirm']){
        req.flash('error', 'Senhas incorretas, tente novamente')
        res.redirect('/profile')
        return
    }

    req.user.setPassword(req.body.password, async ()=>{
        await req.user.save();

        req.flash('sucess', 'Senha alterada com sucesso')
        res.redirect('/')
    })


    // procurar o usuario e trocar a senha 
    // redirecionar para home
}