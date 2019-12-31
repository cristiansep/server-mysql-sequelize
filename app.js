const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS"); 
    res.header("Allow", "POST, GET, PUT, DELETE, OPTIONS"); 
    next();
  });

  // Rutas
  require('./server/routes/usuarios')(app);
  app.get("/", (req, res, next) => {
    res.status(200).json({
      ok: true,
      mensaje: "Peticion realizada correctamente"
    });
  });



  module.exports = app;