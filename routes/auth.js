var config = require('../config/config');
var crypto = require('crypto');
var express = require('express');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

var connection = mysql.createConnection(config.mysql_conn);
var router = express.Router();

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var query = 'SELECT * FROM users WHERE username = "' + username +'"';

    connection.query(query, function(err, results, fields) {
        if (err) {
            return next(err);
        }

        if (results.length != 1) {
            return res.status(404);
        }

        var data = results[0];

        var salt = data.salt;
        var hash = data.hash;

        var pass = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');

        if (pass === hash) {
            // Token is valid for one hour.
            var exp = Math.floor(Date.now() / 1000) + config.jwt.exp;

            return res.status(200).json(jwt.sign({
                username: data.username,
                exp: exp,
                admin: data.admin
            }, config.jwt.secret_key));
        }
        else {
            return res.status(401).json('Failure.');
        }
    });
});

router.post('/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username === '' || password === '') {
        return res.status(400);
    }

    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');

    var query = 'INSERT INTO users (username, hash, salt, admin) VALUES ("' + username + '","' + hash + '","' + salt + '", 0)';

    connection.query(query, function(err, results, fields) {
        if (err) {
            return next(err);
        }

        return res.status(200).json(results);
    });
});

module.exports = router;
