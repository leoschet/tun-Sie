'use strict'

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());

// sets where template files are
app.set('views', __dirname + '/templates');
// sets where static files are (css, js...)
app.use(express.static(__dirname + '/static'));

// .html view setup - need to install ejs
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
	res.render('index');
});

app.listen(port);
console.log("Listening on port " + port);
