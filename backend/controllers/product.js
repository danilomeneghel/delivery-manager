const Product = require("../models/product"),
    mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId

exports.productsList = (req, res) => {
    Product.find()
    .exec((err, results) => {
        if (err) return res.send(err)

        res.status(200).json(results)
    })
}

exports.productCreate = (req, res) => {
    Product.create(req.body.item)
    .then((result) => {
        if (!result) return res.status(400).json({ error: result })

        res.status(201).json({ result: result, success: 'Product successfully created!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.productUpdate = (req, res) => {
    Product.updateOne({_id: ObjectId(req.params.id)}, {
        $set: {
            name: req.body.item.name,
            price: req.body.item.price,
            description: req.body.item.description
        }
    })
    .then((result) => {
        if (!result) return res.status(400).json(false)
        
        res.status(201).json({ result: result, success: 'Product successfully changed!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.productRemove = (req, res) => {
    Product.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.status(400).json(false)

        res.status(200).json({ success: 'Product successfully removed!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.products = (req, res) => {
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
    .catch(err => {
        return res.render('product-add', { message: {'error': err} }) 
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
    .catch(err => {
        return res.render('product-edit', { message: {'error': err} }) 
    })
}

exports.productDelete = (req, res) => {
    Product.deleteOne({_id: ObjectId(req.params.id)}, 
    (err) => {
        if (err) return res.send(err)

        res.redirect('/products')
    })
}
