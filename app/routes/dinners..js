// ROUTES USERS
var Dinner = require('../models/dinner.js');
module.exports 	= function(app) {

	app.get('/dinners', Dinner.findAll);
	app.post('/dinners', Dinner.create);
	app.put('/dinners/:id', Dinner.update);
	app.delete('/dinners/:id', Dinner.delete);
    
}
