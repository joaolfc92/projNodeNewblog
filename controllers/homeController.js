const mongoose = require('mongoose');
const Post = mongoose.model('Post')


exports.index = async (req,res)=>{

    let responseJson ={
        posts:[],  
        tags:[],
        tag:''
    } 

    
    console.log(req.user)

    // filtrando tags
    responseJson.tag = req.query.t;

    const tags = await Post.getTagsList();
    for(let i in tags){
        if(tags[i]._id == responseJson.tag){
            tags[i].class = 'selected'
        }
    }
    responseJson.tags = tags;

    const postFilter = (typeof responseJson.tag != 'undefined') ? {tags: responseJson.tag} : {};
     
    const posts = await Post.find(postFilter)

    responseJson.posts = posts



    res.render('home',responseJson);
}

