// ROUTES PARTIES
var Party = require('../models/party.js');
module.exports 	= function(app) {

    app.get('/parties/:id', Party.findGuests);
	app.get('/parties', Party.findAll);
	app.post('/parties', Party.create);
	app.put('/parties/:id', Party.update);
	app.delete('/parties/:id', Party.delete);
    
}
