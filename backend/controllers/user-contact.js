const UserContact = require("../models/user-contact"),
    User = require("../models/user"),
    mongoose = require('mongoose'),
    async = require('async')

var ObjectId = mongoose.Types.ObjectId

exports.usersContactsList = (req, res) => {
    UserContact.find()
    .populate('user')
    .exec((err, results) => {
        if (err) return res.send(err)

        res.status(200).json(results)
    })
}

exports.userContactCreate = (req, res) => {
    UserContact.create(req.body.item)
    .then((result) => {
        if (!result) return res.status(400).json({ error: result })

        res.status(201).json({ result: result, success: 'User Contact successfully created!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.userContactUpdate = (req, res) => {
    UserContact.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            user: req.body.item.user,
            address: req.body.item.address,
            city: req.body.item.city,
            phone: req.body.item.phone
        }
    })
    .then((result) => {
        if (!result) return res.status(400).json(false)
        
        res.status(201).json({ result: result, success: 'User Contact successfully changed!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.userContactRemove = (req, res) => {
    UserContact.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.status(400).json(false)

        res.status(200).json({ success: 'User Contact successfully removed!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.usersContacts = (req, res) => {
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
    .catch(err => {
        return res.render('user-contact-add', { message: {'error': err} }) 
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
    .catch(err => {
        return res.render('user-contact-edit', { message: {'error': err} }) 
    })
}

exports.userContactDelete = (req, res) => {
    UserContact.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.send(err)

        res.redirect('/users-contacts')
    })
}
