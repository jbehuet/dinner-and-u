// set up ======================================================================
var http			= require('http');
var express			= require('express');
var app				= express();								// create our app w/ express
var port			= process.env.PORT || 8000;					// set the port
var morgan			= require('morgan');
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');
// configuration ===============================================================
app.use(express.static(__dirname + '/public'));					    // set the static files
app.use(morgan('dev'));											    // log every request to the console
app.use(bodyParser.urlencoded({limit: '5mb','extended':'true'}));  // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '5mb'}));						    // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));     // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));				    // override with the X-HTTP-Method-Override header in the request
// Mongoose ====================================================================
require('./config/database');
// Serveur ===================================================================
var server = http.Server(app);
// routes ======================================================================
require('./app/routes')(app);
process.on('SIGINT', function() {
  console.log('Stopping...');
  process.exit();
});
// listen (start app with node server.js) ======================================
server.listen(port);
console.log('App listening on port ' + port);
	
