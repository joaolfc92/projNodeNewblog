module.exports.isLogged = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', "Ops, FAça o login para continuar")
        res.redirect('/users/login')
        return
    }

    next();
}