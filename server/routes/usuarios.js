const usuariosController = require('../controllers').usuarios;

const md_auth = require('../middlewares/autenticacion');

module.exports = (app)=> {
    app.post('/usuario',md_auth.verificaToken,usuariosController.guardar);
    app.post('/login',usuariosController.login);
    app.get('/usuarios',md_auth.verificaToken,usuariosController.getAll);
}