var conn = require('./connection');
var mysql = require('mysql'),
    connection = mysql.createConnection(conn);

var user = {};

user.getUsers = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM user WHERE deleted = 0', function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

user.getUserById = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user WHERE id = ' + connection.escape(id);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

user.getUserByEmail = function (email, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user WHERE email = ' + connection.escape(email);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

user.getRelationshipsByEmailAndRelationship = function (email, relationship, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user WHERE id in ';
        sql += '(select id_user_owner from user_relationship where (id_user_destination=(SELECT id FROM user where email =';
        sql += connection.escape(email) + ') and relationship=' + connection.escape(relationship);
        sql += ')) or id in (select id_user_destination from user_relationship where (id_user_owner=(SELECT id FROM user where email = ';
        sql += connection.escape(email) + ') and relationship=' + connection.escape(relationship) + '));';

        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {

                callback(null, row);
            }

        });
    }
}

user.insertUser = function (userData, callback) {
    if (connection) {
        connection.query('INSERT INTO user SET ?', userData, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, result.insertId);
            }
        });
    }
}

user.updateUser = function (userData, callback) {
    if (connection) {
        var sql = 'UPDATE user SET';
        sql += ' name = ' + connection.escape(userData.name);
        sql += ', lastname = ' + connection.escape(userData.lastname);
        sql += ', telephone = ' + connection.escape(userData.telephone);
        sql += ', email = ' + connection.escape(userData.email);
        // the id_twitter column dosent exist in the new database.
        //sql += ', id_twitter = ' + connection.escape(userData.id_twitter);
        sql += ', deleted = ' + connection.escape(userData.deleted);
        sql += ', updated = ' + connection.escape(userData.updated);
        sql += ' WHERE id = ' + userData.id;
        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, {"mensaje": "Actualizado"});
            }
        });
    }
}

user.deleteUserById = function (id, callback) {
    if (connection) {
        var sql = 'UPDATE user SET deleted = 1';
        sql += ', updated = ' + connection.escape(new Date());
        sql += ' WHERE id = ' + connection.escape(id);
        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, {"mensaje": "User deleted"});
            }
        });
    }
}

user.deleteUserByEmail = function (email, callback) {
    if (connection) {
        var sql = 'UPDATE user SET deleted = 1';
        sql += ', updated = ' + connection.escape(new Date());
        sql += ' WHERE email = ' + connection.escape(email);
        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, {"mensaje": "User deleted"});
            }
        });
    }
}

module.exports = user;
