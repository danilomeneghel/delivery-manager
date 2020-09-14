const product = require('../controllers/product'),
    user = require('../controllers/user')

module.exports = (app) => {

    //API
    app.route('/products-list')
        .get(user.productsList)
    
    app.route('/product-create')
        .post(user.productCreate)
    
    app.route('/product-update/:id')
        .post(user.productUpdate)
    
    app.route('/product-remove/:id')
        .get(user.productRemove)
    
    //Local    
    app.route('/products')
        .get(user.isLoggedIn, product.products)

    app.route('/product-add')
        .get(user.isLoggedIn, product.pageAdd)
        .post(user.isLoggedIn, product.productAdd)

    app.route('/product-edit/:id')
        .get(user.isLoggedIn, product.pageEdit)
        .post(user.isLoggedIn, product.productEdit)

    app.route('/product-delete/:id')
        .get(user.isLoggedIn, product.productDelete)

    return app
}