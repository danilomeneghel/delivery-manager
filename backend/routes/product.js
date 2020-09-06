const product = require('../controllers/product'),
    user = require('../controllers/user')

module.exports = (app) => {

    app.route('/products-list')
        .get(product.products)
    
    app.route('/products')
        .get(user.isLoggedIn, product.productList)

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