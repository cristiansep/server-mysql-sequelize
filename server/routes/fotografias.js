const fotografiasController = require('../controllers').fotografias;
// const md_auth = require('../middlewares/autenticacion');
const md_auth = require('../authenticated/authenticated');
const cm = require('connect-multiparty');
const mdUpload = cm({uploadDir:'./server/uploads/fotografias'});

module.exports = (app)=> {
    app.post('/fotografia',md_auth.auth,fotografiasController.guardarFoto);
    app.post('/fotografia/:id',md_auth.auth,fotografiasController.update);
    app.post('/upload-fotografia/:id',[ md_auth.auth,mdUpload],fotografiasController.uploadFotografia);
    app.get('/get-fotografia/:fotografia/:thumb',fotografiasController.getFotografia);
    app.get('/fotografias',fotografiasController.getAll);
    app.get('/fotografias-admin',md_auth.auth,fotografiasController.getAllAdmin);
    app.get('/fotografia/:id',fotografiasController.getById);
    
}