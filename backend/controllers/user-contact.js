const UserContact = require("../models/user-contact"),
    User = require("../models/user"),
    mongoose = require('mongoose'),
    async = require('async')

var ObjectId = mongoose.Types.ObjectId

exports.usersContacts = (req, res) => {
    UserContact.find()
    .populate('user')
    .exec((err, results) => {
        if (err) return res.send(err)

        res.status(200).json(results)
    })
}

exports.userContactList = (req, res) => {
    UserContact.find()
    .populate('user')
    .exec((err, results) => {
        if (err) return res.send(err)

        res.render('users-contacts', { data: results })
    })
}

exports.pageAdd = (req, res) => {
    User.find()
    .exec((err, results) => {
        if (err) return res.send(err)

        res.render("user-contact-add", { users: results, message: {} })
    })
}

exports.userContactAdd = (req, res) => {
    UserContact.create(req.body)
    .then((result) => {
        if (!result) return res.render('user-contact-add', { message: {'error': result} }) 

        res.redirect('/users-contacts')
    })
}

exports.pageEdit = (req, res) => {
    async.parallel([
        function(callback) {
            User.find({}, function (err, rows1) {
                if (err) return callback(err)
                return callback(null, rows1)
            })
        },
        function(callback) {
            UserContact.findOne({_id: ObjectId(req.params.id)}, function (err, rows2) {
                if (err) return callback(err)
                return callback(null, rows2)
            })
            .populate('user')
        }
    ], function(err, callbackResults) {
        if (err) return res.send(err)

        res.render('user-contact-edit', { users: callbackResults[0], data: callbackResults[1], message: {} })
    })
}

exports.userContactEdit = (req, res) => {
    UserContact.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            user: req.body.user,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone
        }
    })
    .then((result) => {
        if (!result) return res.render('user-contact-edit', { message: {'error': result} }) 
        
        res.redirect('/users-contacts')
    })
}

exports.userContactDelete = (req, res) => {
    UserContact.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.send(err)

        res.redirect('/users-contacts')
    })
}
