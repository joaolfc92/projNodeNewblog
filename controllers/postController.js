const mongoose = require('mongoose');
const Post = mongoose.model('Post');


exports.postAdd= (req,res)=>{
    res.render('postAdd') 
}
// salvando no banco de dados
exports.addAction = async (req,res)=>{
    const post = new Post(req.body);

    // tratando erros
    try{
        await post.save()
    } catch(error){ 
        req.flash('error', 'Error'+error.message)
        return res.redirect('/post/add')
        
    }
    
    req.flash('sucess','Post salvo com sucesso');
    res.redirect('/')
}