const Product = require("../models/product"),
    mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId

exports.products = (req, res) => {
    Product.find()
    .exec((err, results) => {
        if (err) return res.send(err)

        res.status(200).json(results)
    })
}

exports.productList = (req, res) => {
    Product.find()
    .exec((err, results) => {
        if (err) return res.send(err)

        res.render('products', { data: results })
    })
}

exports.pageAdd = (req, res) => {
    res.render("product-add", { message: {} })
}

exports.productAdd = (req, res) => {
    Product.create(req.body)
    .then((result) => {
        if (!result) return res.render('product-add', { message: {'error': result} }) 

        res.redirect('/products')
    })
}

exports.pageEdit = (req, res) => {
    Product.findOne({_id: ObjectId(req.params.id)})
    .exec((err, result) => {
        if (err) return res.send(err)
        
        res.render('product-edit', { data: result, message: {} })
    })
}

exports.productEdit = (req, res) => {
    Product.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        }
    })
    .then((result) => {
        if (!result) return res.render('product-edit', { message: {'error': result} }) 
        
        res.redirect('/products')
    })
}

exports.productDelete = (req, res) => {
    Product.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.send(err)

        res.redirect('/products')
    })
}
