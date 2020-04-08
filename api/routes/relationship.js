var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var relationshipModel = require('../models/relationship');

router.get('/relationships', function (request, response) {
    relationshipModel.getRelationships(function (error, data) {
        response.status(200).json(data);
    });
});

router.post('/relationship', async function (request, response) {
    if (request.body.id) {
        relationshipModel.getRelationshipById(request.body.id, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    } else if (request.body.id_user_owner) {
        relationshipModel.getRelationshipByIdUserOwner(request.body.id_user_owner, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    } else if (request.body.id_user_destination) {
        relationshipModel.getRelationshipByIdUserDestination(request.body.id_user_destination, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    }
}

)
;

router.post('/relationship/create', function (request, response) {
    userModel.getUserByEmail(request.body.email, function (error, datos) {
        if (datos.length > 0) {
            var dt = new Date();
            var relationshipData = {
                id_user_owner: datos[0].id,
                id_user_destination: request.body.id,
                relationship: request.body.relationship,
                deleted: 0,
                created: dt,
                updated: dt
            };
            console.log(relationshipData);
            relationshipModel.insertRelationship(relationshipData, function (error, datos) {
                if (datos) {
                    console.log("inserto");
                    response.status(200).json({"Mensaje": "Insertado"});
                }
                else {
                    console.log("error al insertar");
                    response.status(500).json({"Mensaje": "Error"});
                }
            });
        }
    });
});

router.delete('/relationship', function (request, response) {
    if (request.body.id) {
        relationshipModel.deleteRelationshipById(request.body.id, function (error, datos) {
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
