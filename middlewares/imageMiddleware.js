const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid')


const multerOptions = {
    storage:multer.memoryStorage(),// apos receber a imagem iremos salva-la na memoria
    fileFilter:(req,file,next)=>{ // filtro para formato de imagens
           const allowed = ['image/jpg','image/png','image/jpeg']; // const com os formatos aceitos
           if(allowed.includes(file.mimetype)){
               next(null, true)
           }else{
               next({message:'Arquivo não suportado'},false)
           }
    }

}

exports.upload = multer(multer).single('photo')

exports.resize = ()=>{

}