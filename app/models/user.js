// MODEL USER
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
    password: String,
    avatar: String,
    isAdmin: Boolean
});

var User = {
    
    model: mongoose.model('User', userSchema),
    
    create: function(req, res) {
		User.model.create({
			email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            isAdmin: req.body.isAdmin
		}, function(){
			res.sendStatus(200);
		})
	},

	findAll: function(req, res) {
		User.model.find(function (err, data) {
			res.send(data);
		});
	},

	update: function(req, res){
		User.model.findByIdAndUpdate(req.params.id, {
			email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            isAdmin: req.body.isAdmin
		}, function(){
			res.sendStatus(200);
		})
	},

	delete: function(req, res){
		User.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	} 
}

module.exports = User;
