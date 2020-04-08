var conn = require('./connection');
var mysql = require('mysql'),
connection = mysql.createConnection(conn);

var relationship = {};

relationship.getRelationships = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM user_relationship', function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

relationship.getRelationshipById = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user_relationship WHERE id = ' + connection.escape(id);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

relationship.getRelationshipByIdUserOwner = function (id_user_owner, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user_relationship WHERE id_user_owner = ' + connection.escape(id_user_owner);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

relationship.getRelationshipByIdUserDestination = function (id_user_destination, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user_relationship WHERE id_user_destination = ' + connection.escape(id_user_destination);
        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

relationship.insertRelationship = function (relationshipData, callback) {
    if (connection) {
        connection.query('INSERT INTO user_relationship SET ?', relationshipData, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, result.insertId);
            }
        });
    }
}

relationship.deleteRelationshipById = function (id, callback) {
    if (connection) {
        var sql = 'UPDATE user_relationship SET deleted = 1';
        sql += ', updated = ' + connection.escape(new Date());
        sql += ' WHERE id = ' + connection.escape(id);
        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, {"mensaje": "relationship deleted"});
            }
        });
    }
}

module.exports = relationship;