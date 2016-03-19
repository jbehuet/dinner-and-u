// MODEL RECIPE
var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: String,
    picture: String,
    description: String,
    note: Number,
    reviews: [String],
    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party'
    }
});

var Recipe = {

    model: mongoose.model('Recipe', recipeSchema),

    create: function (req, res) {
        Recipe.model.create({
            name: req.body.name,
            picture: req.body.picture,
            description: req.body.description,
            note: req.body.note,
            party: req.body.party
        }, function () {
            res.sendStatus(200);
        })
    },

    findAll: function (req, res) {
        Recipe.model.find({party: req.params.party})
            .populate("party")
            .exec(function (err, data) {
                res.json(data);
            });
    },

    update: function (req, res) {
        Recipe.model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            picture: req.body.picture,
            description: req.body.description,
            note: req.body.note,
            party: req.body.party
        }, function () {
            res.sendStatus(200);
        })
    },

    delete: function (req, res) {
        Recipe.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}

module.exports = Recipe;
