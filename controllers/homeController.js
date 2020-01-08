exports.userLog = (req,res,next)=>{
    let info = {name:'joao', id:123}
    req.userInfo = info;
    next();
}


exports.index = (req,res)=>{
    let obj = {
        userInfo: req.userInfo
    }
    res.render('home', obj );
}

