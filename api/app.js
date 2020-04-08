var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var aplicacion = express();

var user = require("./routes/user");
var relationship = require("./routes/relationship");
var profile = require("./routes/profile");

router.get('/', function (request, response) {
    response.status(200).json({"mensaje": "Hola"});
});

aplicacion.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

aplicacion.use(bodyParser.json());

aplicacion.use(router);

aplicacion.use(user);

aplicacion.use(relationship);

aplicacion.use(profile);

aplicacion.listen(5000, function () {
    console.log("Servidor iniciado");
});
