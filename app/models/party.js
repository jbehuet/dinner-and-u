// MODEL PARTY
var mongoose = require('mongoose');

var partySchema = new mongoose.Schema({
    title: String,
    date: Date,
    guests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

var Party = {

    model: mongoose.model('Party', partySchema),

    create: function (req, res) {
        Party.model.create({
            title: req.body.title,
            date: req.body.date
        }, function () {
            res.sendStatus(200);
        })
    },

    findAll: function (req, res) {
        Party.model.find({})
            .populate("guests", "-password")
            .exec(function (err, data) {
                res.json(data);
            });
    },

    update: function (req, res) {
        Party.model.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                date: req.body.date
            },
            $inc: {
                __v: 1
            }
        }, function () {
            res.sendStatus(200);
        })
    },

    delete: function (req, res) {
        Party.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}

module.exports = Party;
