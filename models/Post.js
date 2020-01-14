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

    tags:[String]


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


module.exports = mongoose.model('Post', postSchema); 