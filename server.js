var bodyParser = require('body-parser');
var color = require('colors');
var config = require('./config/config');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Routes
const API = config.api_route;

var adminRoute  = require('./routes/admin');
var authRoute   = require('./routes/auth');
var centreRoute = require('./routes/centre');
var shopRoute   = require('./routes/shop');

app.use(API + '/admin', adminRoute);
app.use(API + '/auth', authRoute);
app.use(API + '/centre', centreRoute);
app.use(API + '/shop', shopRoute);

app.listen(config.port, function() {
    console.log('Server running at http://localhost:' + config.port + '/');
});
