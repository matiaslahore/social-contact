var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

router.get('/users', function (request, response) {
    userModel.getUsers(function (error, data) {
        response.status(200).json(data);
    });
});

router.post('/user', async function (request, response) {
    if (request.body.id) {
        userModel.getUserById(request.body.id, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    } else if (request.body.email) {
        userModel.getUserByEmail(request.body.email, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    }
});

router.post('/user/relationships', async function (request, response) {
    if (request.body.email && request.body.relationship) {
        userModel.getRelationshipsByEmailAndRelationship(request.body.email, request.body.relationship, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    }
});

router.post('/user/create', function (request, response) {
    var dt = new Date();
    var userData = {
        name: request.body.name,
        lastname: request.body.lastname,
        telephone: request.body.telephone,
        email: request.body.email,
        id_twitter: request.body.id_twitter ? request.body.id_twitter : null,
        deleted: 0,
        updated: dt,
        created: dt
    };
    userModel.insertUser(userData, function (error, datos) {
        if (datos) {
            response.status(200).json({"Mensaje": "Insertado"});
        }
        else {
            response.status(500).json({"Mensaje": "Error"});
        }
    });
});

router.put('/user', function (request, response) {
    userModel.getUserByEmail(request.body.email, function (error, datos) {
        if (datos.length > 0) {
            var userData = {
                id: datos[0].id,
                name: request.body.name ? request.body.name : datos[0].name,
                lastname: request.body.lastname ? request.body.lastname : datos[0].lastname,
                telephone: request.body.telephone ? request.body.telephone : datos[0].telephone,
                email: request.body.email ? request.body.email : datos[0].email,
                id_twitter: request.body.id_twitter ? request.body.id_twitter : datos[0].id_twitter,
                deleted: request.body.deleted ? request.body.deleted : datos[0].deleted,
                updated: new Date()
            };
            userModel.updateUser(userData, function (error, datos) {
                if (datos && datos.mensaje) {
                    response.status(200).json(datos);
                }
                else {
                    response.status(500).json({"mensaje": "Hubo un error al editar el usuario"});
                }
            });
        }
        else {
            response.status(404).json({"Mensaje": "El usuario que quiere editar no existe"});
        }
    });
});

router.delete('/user', function (request, response) {
    if (request.body.id) {
        userModel.deleteUserById(request.body.id, function (error, datos) {
            if (datos && datos.mensaje) {
                response.status(200).json(datos);
            }
            else {
                response.status(500).json({"mensaje": "Error"});
            }
        });
    } else if (request.body.email) {
        userModel.deleteUserByEmail(request.body.email, function (error, datos) {
            if (datos && datos.mensaje) {
                response.status(200).json(datos);
            }
            else {
                response.status(500).json({"mensaje": "Error"});
            }
        });
    }
});


module.exports = router;