//Salvar a imagem na pasta public de src

const multer = require('multer')

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./src/public")
    },
    
    filename: function(req, file, cb) {
    
        let nome_sem_espacos = file.originalname.split('').join('_')
        let nome_array = nome_sem_espacos.split(' ')
        let nome_com_underline = nome_array.join('_')
        return cb(null, `${date.now()}_${nome_com_underline}`)
    }
})
//exportando configuração para o multer fazer upload da imagem
let upload = multer({ storage });

module.exports = upload;