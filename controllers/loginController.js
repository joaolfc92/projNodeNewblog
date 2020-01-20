const User = require('../models/User')
const crypto = require('crypto');
const mailHandler = require('../handlers/mailHandler');



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


exports.logoutAction = (req,res) =>{ 
    req.logout();
    res.redirect('/')
}

exports.profile = (req,res) =>{
    res.render('profile')
}
 
exports.profileAction = async (req,res) =>{
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            { name:req.body.name, email:req.body.email},
            { new:true, runValidators:true }
        )
    } catch(e) {
            res.flash('error', 'Ocorreu um erro, tente novamente mais tarde')
            res.redirect('/profile')
            return;

    }
        req.flash('sucess', 'Dados atualizados com sucesso !!') 
        res.redirect('/profile')
}


exports.forget = (req,res) =>{
    res.render('forget')
}

exports.forgetAction = async (req,res) =>{
    // verificar se o usuario existe

    const user = await User.findOne({email: req.body.email}).exec();

    if(!user){
        req.flash('error', 'Email inválido, Tente novamente');
        res.redirect('/users/forget')
        return;
    };

    // gerar um tokken com data de expiração e salvar no banco


    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');

    user.resetPasswordExpires = Date.now() + 3600000 // 1 hora

    await user.save()




    // gerar o link com token para trocar senha

    const resetLink = ` ${req.headers.host}/users/reset/${user.resetPasswordToken}`


    req.flash('sucess', 'E-mail enviado, Verifique sua caixa de e-mail.')
    res.redirect('/users/login')

    // enviar o link via email via email
    const html = `Testando e-mail com link:<br> <a href="${resetLink}">Resetar sua Senha </a>`
    const text = `Testando e-mail com link: ${resetLink}`
    const to = `${user.name} <${user.email}>`
    mailHandler.send({
        to,
        subject:'Reset Password',
        html,
        text
    })



    // quando o usuario acessar e trocar a senha


}



exports.forgetToken = async (req,res) =>{
    const user = await User.findOne({
        resetPasswordToken : req.params.token,
        resetPasswordExpires : {$gt: Date.now()}
    }).exec()

    if(!user){
        req.flash('error','Token espirado')
        res.redirect('/users/forget')
        return;
    }

    res.render('forgetPAssword');

}

exports.forgetTokenAction = async (req,res) => {
    const user = await User.findOne({
        resetPasswordToken : req.params.token,
        resetPasswordExpires : {$gt: Date.now()}
    }).exec()

    if(!user){
        req.flash('error','Token espirado')
        res.redirect('/users/forget')
        return;
    }

    if(req.body.password != req.body['password-confirm']){
        req.flash('error', 'Senhas incorretas, tente novamente')
        res.redirect('back')
        return
    }



    user.setPassword(req.body.password, async ()=>{
        await user.save();

        req.flash('sucess', 'Senha alterada com sucesso')
        res.redirect('/')
    })


}