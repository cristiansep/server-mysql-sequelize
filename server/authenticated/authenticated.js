const njwt = require('njwt');
var config = require('../config/config.json');
var secret = config.token_secret;


function auth(req,res,next) {
    if(!req.headers.authorization) {
        return res.status(403).json({
            message: 'Peticion sin cabecera de autenticacion'
        })
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
    var payLoad = njwt.verify(token,secret, (err, verifiedjwt)=> {
        if(err){
            return res.status(401).json({
                message: 'Acceso no autorizado.'
            })
        }else {
            next();
        }
    })
}

module.exports = {
    auth
}