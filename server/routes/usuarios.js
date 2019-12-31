const usuariosController = require('../controllers').usuarios;

module.exports = (app)=> {
    app.post('/usuario',usuariosController.guardar);
    app.post('/login',usuariosController.login);
}