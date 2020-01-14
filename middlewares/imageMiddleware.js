const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid')


const multerOptions = {
    storage:multer.memoryStorage(),// apos receber a imagem iremos salva-la na memoria
    fileFilter:(req,file,next)=>{ // filtro para formato de imagens
           const allowed = ['image/jpg','image/png','image/jpeg','image/gif']; // const com os formatos aceitos
           if(allowed.includes(file.mimetype)){
               next(null, true) 
           }else{
               next({message:'Arquivo não suportado'},false) 
           }
    }

}

exports.upload = multer(multerOptions).single('photo')

exports.resize = async(req,res,next)=>{
    if(!req.file){  // verificando se houve envio de imagem
        next()
        return
    }

    // gerando um nome para o arquivo

    const ext = req.file.mimetype.split('/')[1]; // pegando a extenção do arquivo
    let filename =`${uuid.v4()}.${ext}` // gerando um nome aleatorio para o arquivo
    
    req.body.photo = filename; // colocando essse nome de arquivo na requisição


    // trabalhando o redimencionamento da img
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800,jimp.AUTO);

    await photo.write(`./public/media/${filename}`) // lugar onde a img sera salva

    next();

}