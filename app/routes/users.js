// ROUTES USERS
var User = require('../models/user.js');
module.exports 	= function(app) {

	app.get('/users', User.findAll);
	app.post('/users', User.create);
	app.put('/users/:id', User.update);
	app.delete('/users/:id', User.delete);
    
}
