const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    //confere se auth existe, e separa o Bearer(0) do restante do token(1)
    const token = authHeader && authHeader.split(" ")[1];

    // check if header has a token
    if(!token) return res.status(401).json({errors: ["Acesso negado"]});

    // check if token is valid
    try {
        // verifica se o token combina com nosso secret
        const verified = jwt.verify(token, jwtSecret);

        // tenta achar o user
        req.user = await User.findById(verified.id).select("-password");

        next();
    } catch (error) {
        res.status(401).json({errors: ["Token inválido"]});
    }
};

module.exports = authGuard;