const njwt = require('njwt');
var config = require('../config/config.json');
var secret = config.token_secret;

exports.createToken = (usuario) => {
    let params = {
        sub: usuario.id,
        usuario: usuario.usuario,
        id_rol: usuario.id_rol
    }

    var jwt = njwt.create(params, secret );

    var t = new Date();
    t.setHours(t.getHours()+4);
    jwt.setExpiration(t);

    var token = jwt.compact();

    return token;
}