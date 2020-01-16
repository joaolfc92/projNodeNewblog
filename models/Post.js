const mongoose = require('mongoose');
const slug = require('slug');
mongoose.Promise = global.Promise;



// CRIANDO A ESTRUTURA DOS POST NO BANCO DE DADOS
const postSchema = new mongoose.Schema({   
    photo:String,    
    title:{           
        type:String,
        trim:true,
        required:"Preencha o campo titulo"
    },

    slug:{
        type:String
    },

    body:{ 
        type:String,
        trim:true 
    }, 

    tags:[String],

    author:mongoose.Schema.Types.ObjectId


});

// criação do slug
postSchema.pre('save', async function(next){ // pre de pre salvamento
   if(this.isModified('title')){ // if de criação de slug e modificação caso o mesmo seja modificado
        this.slug = slug(this.title,{lower:true});

        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i')

        const postWithSlug = await this.constructor.find({slug:slugRegex});

        if(postWithSlug.length>0){
            this.slug = `${this.slug}-${postWithSlug.length+1}`;
        }
    }
    
  
    next();
})


postSchema.statics.getTagsList = function(){
    return this.aggregate([
        {  $unwind:'$tags'  },
        {  $group:{_id:'$tags', count: {$sum:1}}},
        {  $sort: {count:-1}}
    ]);
}

postSchema.statics.findPosts = function(filters = {}){
    return this.aggregate([
        {$match: filters},
        {$lookup: {
            from: 'users',
            let:{'author':'$author'},
            pipeline:[
                {$match:{$expr:{$eq:['$$author','$_id']}}},
                {$limit:1}
            ],
            as:'author'
        }},
        { $addFields:{
            'author':{ $arrayElemAt:['$author', 0]}
        }}
    ])
}

module.exports = mongoose.model('Post', postSchema); 