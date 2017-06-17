var config = require('../config/config');
var express = require('express');

var router = express();

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
})
