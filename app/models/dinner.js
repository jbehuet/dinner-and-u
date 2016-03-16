// MODEL DINNER
var mongoose = require('mongoose');

var dinnerSchema = new mongoose.Schema({
    name: String,
    picture: String,
    description: String,
    note: Number,
    reviews: [String]
});

var Dinner = {
    
    model: mongoose.model('Dinner', dinnerSchema),
    
    create: function(req, res) {
		Dinner.model.create({
			name: req.body.name,
            picture: req.body.picture,
            description: req.body.description
		}, function(){
			res.sendStatus(200);
		})
	},

	findAll: function(req, res) {
		Dinner.model.find(function (err, data) {
			res.send(data);
		});
	},

	update: function(req, res){
		Dinner.model.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
            picture: req.body.picture,
            description: req.body.description
		}, function(){
			res.sendStatus(200);
		})
	},

	delete: function(req, res){
		Dinner.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	} 
}

module.exports = Dinner;
