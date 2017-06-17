var bodyParser = require('body-parser');
var child = require('child_process');
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
var centreRoute = require('./routes/centre');
var shopRoute   = require('./routes/shop');

app.use(API + '/admin', adminRoute);
app.use(API + '/centre', centreRoute);
app.use(API + '/shop', shopRoute);

console.log('\nExecuting MySQL scripts...');
child.exec('bash ./sql/sql.sh', (error, stdout, stderr) => {
    if(error) {
        console.error('Execution error:'.red, error.red);
        return;
    }

    if(stderr.length != 0) {
        console.log('Warnings/Errors :'.red);
        console.log(stderr);
    }

    console.log(stdout);

    app.listen(config.port, function() {
        console.log('Server running at http://localhost:' + config.port + '/');
    });
});
