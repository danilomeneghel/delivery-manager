const product = require('../controllers/product'),
    user = require('../controllers/user')

module.exports = (app) => {

    //API
    app.route('/products-list')
        .get(product.productsList)
    
    app.route('/products-combo')
        .get(product.productsCombo)
    
    app.route('/product-create')
        .post(product.productCreate)
    
    app.route('/product-update/:id')
        .post(product.productUpdate)
    
    app.route('/product-remove/:id')
        .get(product.productRemove)
    
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