var conn = require('./connection');
var mysql = require('mysql'),
    connection = mysql.createConnection(conn);

var profile = {};

profile.getProfiles = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM user_profile', function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

profile.getProfileById = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user_profile WHERE id = ' + connection.escape(id);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

profile.getProfileByEmailAndProfile = function (email, profile, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user_profile WHERE id_user_owner = (SELECT id FROM user WHERE email = ' + connection.escape(email) + ')';
        sql += 'AND relationship = ' + connection.escape(profile);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

/*
profile.getProfileByEmailAndProfile = function (email, profile, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user WHERE email = ' + connection.escape(email);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                if (connection) {
                    var sql = 'SELECT * FROM user_profile WHERE id_user_owner = ' + connection.escape(row[0]['id']);
                    connection.query(sql, function (error, row) {
                        if (error) {
                            throw error;
                        } else {
                            callback(null, row);
                        }
                    });
                }
            }
        });
    }
}*/

profile.getProfileByIdTwitter = function (id_twitter, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user_profile WHERE id_twitter = ' + connection.escape(id_twitter);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

profile.getProfileByIdFacebook = function (id_facebook, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user_profile WHERE id_facebook = ' + connection.escape(id_facebook);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

profile.getProfileByIdLinkedin = function (id_linkedin, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user_profile WHERE id_linkedin = ' + connection.escape(id_linkedin);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

profile.insertProfile = function (profileData, callback) {
    if (connection) {
        connection.query('INSERT INTO user_profile SET ?', profileData, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, result.insertId);
            }
        });
    }
}

profile.deleteProfileById = function (id, callback) {
    if (connection) {
        var sql = 'UPDATE user_profile SET deleted = 1';
        sql += ', updated = ' + connection.escape(new Date());
        sql += ' WHERE id = ' + connection.escape(id);
        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, {"mensaje": "profile deleted"});
            }
        });
    }
}

module.exports = profile;