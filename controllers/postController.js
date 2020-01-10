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


exports.edit = async (req,res)=>{
    // pegar as informações do post
    const post = await Post.findOne({slug: req.params.slug})
    // carregar o form de edição
    res.render('postEdit',{ post:post}) 
}

exports.editAction = async (req,res)=>{
     req.body.slug = require('slug')(req.body.title, {lower:true})

    try{ 

    // procurar item enviado
        const post = await Post.findOneAndUpdate(
            {slug : req.params.slug}, // qual item procurar 
            req.body, // os novos dados que vamos enviar 
            {
                new:true, // retorna os  dados atualizados
                runValidators:true
            }
        )
    } catch(error){
        req.flash('error', 'Error'+error.message)
        return res.redirect('/post/'+req.params.slug+'edit')
        
    }
    
    // mostrar mensagem de sucesso

    req.flash('sucess', 'Post atualizado com sucesso')
    // redirecionar

    res.redirect('/') 
}