const Order = require("../models/order"),
    User = require("../models/user"),
    Product = require("../models/product"),
    mongoose = require('mongoose'),
    async = require('async')

var ObjectId = mongoose.Types.ObjectId

exports.ordersList = (req, res) => {
    Order.find()
    .populate('user')
    .populate('product')
    .exec((err, results) => {
        if (err) return res.send(err)

        res.status(200).json(results)
    })
}

exports.orderCreate = (req, res) => {
    Order.create(req.body.item)
    .then((result) => {
        if (!result) return res.status(400).json({ error: result })

        res.status(201).json({ result: result, success: 'Order successfully created!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.orderUpdate = (req, res) => {
    Order.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            user: req.body.item.user,
            product: req.body.item.product,
            quantity: req.body.item.quantity,
            deliveryDate: req.body.item.deliveryDate,
            note: req.body.item.note
        }
    })
    .then((result) => {
        if (!result) return res.status(400).json(false)
        
        res.status(201).json({ result: result, success: 'Order successfully changed!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.orderRemove = (req, res) => {
    Order.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.status(400).json(false)

        res.status(200).json({ success: 'Order successfully removed!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.orders = async (req, res) => {
    Order.find()
    .populate('user')
    .populate('product')
    .exec((err, results) => {
        if (err) return res.send(err)

        res.render('orders', { data: results })
    })
}

exports.pageAdd = (req, res) => {
    async.parallel([
        function(callback) {
            User.find({role: 'user'}, function (err, rows1) {
                if (err) return callback(err)
                return callback(null, rows1)
            })
        },
        function(callback) {
            Product.find({}, function (err, rows2) {
                if (err) return callback(err)
                return callback(null, rows2)
            })
        }
    ], function(err, callbackResults) {
        if (err) return res.send(err)

        res.render('order-add', { users: callbackResults[0], products: callbackResults[1], message: {} })
    })
}

exports.orderAdd = (req, res) => {
    Order.create(req.body)
    .then((result) => {
        if (!result) return res.render('order-add', { message: {'error': result} }) 

        res.redirect('/orders')
    })
    .catch(err => {
        return res.render('order-add', { message: {'error': err} }) 
    })
}

exports.pageEdit = (req, res) => {
    async.parallel([
        function(callback) {
            User.find({role: 'user'}, function (err, rows1) {
                if (err) return callback(err)
                return callback(null, rows1)
            })
        },
        function(callback) {
            Product.find({}, function (err, rows2) {
                if (err) return callback(err)
                return callback(null, rows2)
            })
        },
        function(callback) {
            Order.findOne({_id: ObjectId(req.params.id)}, function (err, rows3) {
                if (err) return callback(err)
                return callback(null, rows3)
            })
            .populate('user')
            .populate('product')
        }
    ], function(err, callbackResults) {
        if (err) return res.send(err)

        res.render('order-edit', { users: callbackResults[0], products: callbackResults[1], data: callbackResults[2], message: {} })
    })
}

exports.orderEdit = (req, res) => {
    Order.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            user: req.body.user,
            product: req.body.product,
            quantity: req.body.quantity,
            deliveryDate: req.body.deliveryDate,
            note: req.body.note
        }
    })
    .then((result) => {
        if (!result) return res.render('order-edit', { message: {'error': result} }) 
        
        res.redirect('/orders')
    })
    .catch(err => {
        return res.render('order-edit', { message: {'error': err} }) 
    })
}

exports.orderDelete = (req, res) => {
    Order.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.send(err)

        res.redirect('/orders')
    })
}
