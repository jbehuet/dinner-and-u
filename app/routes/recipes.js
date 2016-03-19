// ROUTES RECIPES
var Recipe = require('../models/recipe.js');
module.exports 	= function(app) {

	app.get('/recipes/:party', Recipe.findAll);
	app.post('/recipes', Recipe.create);
	app.put('/recipes/:id', Recipe.update);
	app.delete('/recipes/:id', Recipe.delete);
    
}
