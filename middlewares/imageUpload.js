const multer = require("multer");
const path = require("path");

// destination to store image
const imageStorage = multer.diskStorage({
    // aqui estamos mudando o destino padrão
    // requisição, arquivo e callback
    destination: (req, file, cb) => {
        let folder = "";

        // se vier de uma url que inclui tal nome, será de tal pasta
        if(req.baseUrl.includes("users")) {
            folder = "users";
        } else if(req.baseUrl.includes("photos")) {
            folder = "photos";
        };

        // isso aqui configura o destino da imagem
        cb(null, `uploads/${folder}/`);
    },
    // aqui estamos mudando o nome padrão
    filename: (req, file, cb) => {
        // vai sair como data.jpg
        // se o sistema escalar muito, devemos mudar o sistema para evitar substituição de imagem
        // se o sistema escalar muito, usariamos a biblioteca uuid
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// validação da imagem, e definir onde será salva
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Insira no formato png, ou jpg"));
        };
        cb(undefined, true);
    },
});

module.exports = { imageUpload };