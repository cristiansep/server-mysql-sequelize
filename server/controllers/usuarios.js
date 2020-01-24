const usuarios = require('../models').usuarios;


//paquete para generar json-web-tokens
// const jwt = require('jsonwebtoken');

const jwt = require('../services/jwt');

//Semilla de token
const SEED = require('../config/config').SEED;



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
        // let token = jwt.sign({ usuario: usuario }, SEED, {expiresIn: 14400}); 
    
        if(usuario){

            if(req.body.token){
                 res.status(200).json({
                  ok:true,
                  token: jwt.createToken(usuario)
              });
            }else{
                res.status(200).json({
                    ok:true,
                    usuario
                });
            }
             
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

function getAll(req,res){
    usuarios.findAll()
    .then(usuarios => {
        res.status(200).json({
            ok:true,
            usuarios
        });
    })
    .catch(err => {
        res.status(500).json({
            ok:false,
            message: 'Error al buscar usuarios'
        });
    })
}

module.exports = {
    guardar,
    login,
    getAll
}