var express = require('express');
var router = express.Router();
var profileModel = require('../models/profile');

router.get('/profiles', function (request, response) {
    profileModel.getProfiles(function (error, data) {
        response.status(200).json(data);
    });
});

router.post('/profile', async function (request, response) {
    if (request.body.id) {
        profileModel.getProfileById(request.body.id, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    } else if (request.body.email && request.body.profile) {
        profileModel.getProfileByEmailAndProfile(request.body.email, request.body.profile, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    } else if (request.body.id_twitter) {
        profileModel.getProfileByIdTwitter(request.body.id_twitter, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    } else if (request.body.id_facebook) {
        profileModel.getProfileByIdFacebook(request.body.id_facebook, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    } else if (request.body.id_linkedin) {
        profileModel.getProfileByIdLinkedin(request.body.id_linkedin, function (error, datos) {
            if (datos.length > 0) {
                response.status(200).json(datos);
            }
            else {
                response.status(404).json({"Mensaje": "No existe el usuario"});
            }
        });
    }
});

router.post('/profile/create', function (request, response) {
    var dt = new Date();
    var profileData = {
        id_user_owner: request.body.id_user_owner,
        relationship: request.body.relationship,
        id_twitter: request.body.id_twitter,
        id_facebook: request.body.id_facebook,
        id_linkedin: request.body.id_linkedin,
        deleted: 0,
        created: dt,
        updated: dt
    };
    profileModel.insertProfile(profileData, function (error, datos) {
        if (datos) {
            response.status(200).json({"Mensaje": "Insertado"});
        }
        else {
            response.status(500).json({"Mensaje": "Error"});
        }
    });
});

router.delete('/profile', function (request, response) {
    if (request.body.id) {
        profileModel.deleteProfileById(request.body.id, function (error, datos) {
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