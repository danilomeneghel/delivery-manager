const passport = require("passport"),
    User = require("../models/user"),
    mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId

exports.usersList = (req, res) => {
    User.find()
    .exec((err, results) => {
        if (err) return res.send(err)

        res.status(200).json(results)
    })
}

exports.userCreate = (req, res) => {
    User.create(req.body.item)
    .then((result) => {
        if (!result) return res.status(400).json({ error: result })

        res.status(201).json({ result: result, success: 'User successfully created!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.userUpdate = (req, res) => {
    User.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            name: req.body.item.name,
            email: req.body.item.email,
            username: req.body.item.username,
            password: req.body.item.password,
            role: req.body.item.role,
            status: req.body.item.status
        }
    })
    .then((result) => {
        if (!result) return res.status(400).json(false)
        
        res.status(201).json({ result: result, success: 'User successfully changed!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.userRemove = (req, res) => {
    User.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.status(400).json(false)

        res.status(200).json({ success: 'User successfully removed!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.users = (req, res) => {
    User.find()
    .exec((err, results) => {
        if (err) return res.send(err)

        res.render('users', { data: results })
    })
}

exports.pageAdd = (req, res) => {
    res.render("user-add", { message: {} })
}

exports.userAdd = (req, res) => {
    User.create(req.body)
    .then((result) => {
        if(result) return res.render('user-add', { message: {'error': result} }) 
        
        res.redirect("/users")
    })
    .catch(err => {
        return res.render('user-add', { message: {'error': err} }) 
    })
}

exports.pageEdit = (req, res) => {
    User.findOne({_id: ObjectId(req.params.id)}).exec((err, result) => {
        if (err) return res.send(err)
        
        res.render('user-edit', { data: result, message: {} })
    })
}

exports.userEdit = (req, res) => {
    User.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status
        }
    })
	.then((result) => {
        if (!result) return res.render('user-edit', { message: {'error': result} }) 
        
        res.redirect("/users")
    })
    .catch(err => {
        return res.render('user-edit', { message: {'error': err} }) 
    })
}

exports.pageProfile = (req, res) => {
    User.find({_id: req.user.id})
    .exec((err, result) => {
        if (err) return res.send(err)
        
        res.render('profile', { data: result, message: {} })
    })
}

exports.editProfile = (req, res) => {
	var data = {
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	}
    User.updateOne({_id: req.user.id}, {
        $set: data
    })
	.then((result) => {
        if (!result) return res.render('profile', { message: {'error': result} }) 
		
        res.render('profile', { data: [data], message: {'success': 'Profile updated success!'} })
    })
    .catch(err => {
        return res.render('profile', { message: {'error': err} }) 
    })
}

exports.userDelete = (req, res) => {
    User.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.send(err)

        res.redirect('/users')
    })
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next()

    res.redirect("/login")
}
