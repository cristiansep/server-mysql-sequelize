const fotografias = require('../models').fotografias;
const fs = require('fs');
const thumb = require('node-thumbnail').thumb;
const path = require('path');

function guardarFoto(req,res){
    let body = req.body;
    fotografias.create(body)
               .then(fotografia => {
                    res.status(200).json({
                        ok: true,
                        fotografia
                    });
               })
               .catch(err => {
                   res.status(500).json({
                       message: 'Error al guardar fotografia'
                   })
               })
}

function update(req,res) {
    let id = req.params.id;
    let body = req.body;

    fotografias.findByPk(id)
                .then(fotografia => {
                    fotografia.update(body)
                        .then(()=> {
                            res.status(200).json({
                                ok: true,
                                fotografia
                            });

                        })
                        .catch(err => {
                            res.status(500).json({
                                message: 'Error al actualizar fotografia'
                            });
                        })
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Error al buscar fotografia'
                    });
                })
}

function uploadFotografia(req,res){
    let id = req.params.id;

    if(req.files) {
        let filePath = req.files.foto.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[3];
        let ext_split = fileName.split('\.');
        let file_ext = ext_split[1];


        if (file_ext === 'jpg' || file_ext === 'png') {
          let foto = {};
          foto.imagen = fileName;

          fotografias
            .findByPk(id)
            .then(fotografia => {
              fotografia.update(foto)
                .then(() => {
                    let newPath = './server/uploads/fotografias/' + fileName;
                    let thumbPath = './server/uploads/fotografias/thumbs';

                    thumb({
                        source: path.resolve(newPath),
                        destination: path.resolve(thumbPath),
                        whidth: 200,
                        suffix: ''
                    }).then(()=>{
                        res.status(200).json({
                                            ok: true,
                                            fotografia
                                        });
                    }).catch(err => {
                        res.status(500).json({
                            message: "Error al crear thumbnail"
                          });
                    });

                 
                })
                .catch(err => {
                  fs.unlink(filePath, err => {
                    if (err) {
                      res.status(500).json({
                        message: "Error al eliminar archivo"
                      });
                    }
                  });
                  res.status(500).json({
                    message: "Error al actualizar fotografia"
                  });
                });
            })
            .catch(err => {
              fs.unlink(filePath, err => {
                if (err) {
                  res.status(500).json({
                    message: "Error al eliminar archivo"
                  });
                }
              });
              res.status(500).json({
                message: "Error al buscar fotografia"
              });
            });
        } else {
          fs.unlink(filePath, err => {
            if (err) {
              res.status(500).json({
                message: "Error al eliminar Archivo"
              });
            }
          });
          res.status(500).json({
            message: "La extension no es valida"
          });
        }   
    }else {
        res.status(400).json({
            message: 'Debe seleccionar una fotografia'
        });
    }
}



function getFotografia(req,res){
  var fotografia=req.params.fotografia;
  var thumb=req.params.thumb;
  
  if(thumb=="false")
      var path_foto='./server/uploads/fotografias/' + fotografia;
  else if(thumb=="true")
      var path_foto='./server/uploads/fotografias/thumbs/' + fotografia;

  fs.exists(path_foto,(exists)=>{
      if(exists){
          res.sendFile(path.resolve(path_foto));
      }
      else{
          res.status(404).send({message:"No se encuentra la fotografía."});
      }
  })
}

function getAll(req,res){
  fotografias.findAll({
    where: {
      activo: true
    },
    order:[
      ['numero', 'ASC']
    ]
  })
  .then(fotografias=>{
    res.status(200).json({
      ok: true,
      fotografias
    })
  }).catch(err => {
    res.status(500).json({
      ok:false,
      message: 'Error al buscar fotografias'
  });
  })
}


function getAllAdmin(req,res){
  fotografias.findAll({
    order:[
      ['numero', 'ASC']
    ]
  })
  .then(fotografias=>{
    res.status(200).json({
      ok: true,
      fotografias
    })
  }).catch(err => {
    res.status(500).json({
      ok:false,
      message: 'Error al buscar fotografias'
  });
  })
}

function getById(req,res){
  var id=req.params.id;

  fotografias.findByPk(id)
  .then(fotografia=>{
      res.status(200).send({fotografia});
  })
  .catch(err=>{
      res.status(500).send({message:"Ocurrió un error al buscar una fotografía."});
  })
}


module.exports = {
    guardarFoto,
    update,
    uploadFotografia,
    getFotografia,
    getAll,
    getAllAdmin,
    getById
}