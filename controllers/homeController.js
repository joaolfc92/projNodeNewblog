const mongoose = require('mongoose');
const Post = mongoose.model('Post')


exports.index = async (req,res)=>{

    let responseJson ={
        posts:[], 
        tags:[]
    }

    const tags = await Post.getTagsList();
    responseJson.tags = tags;

    
     
    const posts = await Post.find()

    responseJson.posts = posts



    res.render('home',responseJson);
}

