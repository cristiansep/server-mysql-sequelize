const usuarios = require('../models').usuarios;


function guardar(req,res){
    usuarios.create(req.body)
    .then(usuario => {
        res.status(200).json({
            ok:true,
            usuario
        });

    })
    .catch(err => {
        res.status(500).json({
            ok:false,
            err
        });
    })
}

function login(req,res){
    usuarios.findOne({
        where: {
            usuario: req.body.usuario,
            password: req.body.password
        }
    })
    .then(usuario => {

        if(usuario){
              res.status(200).json({
                  ok:true,
                  usuario
              });
        }else {
            res.status(401).json({
                ok:false,
                message: 'Error de autenticacion usuario o contraseña incorrecta'
            });
        }
      
    })
    .catch(err => {
        res.status(500).json({
            ok:false,
            message: 'Error al buscar usuario'
        });
    })
}

module.exports = {
    guardar,
    login
}