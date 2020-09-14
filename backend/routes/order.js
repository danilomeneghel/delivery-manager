const order = require('../controllers/order'),
    user = require('../controllers/user')

module.exports = (app) => {

    //API
    app.route('/orders-list')
        .get(user.ordersList)
    
    app.route('/order-create')
        .post(user.orderCreate)
    
    app.route('/order-update/:id')
        .post(user.orderUpdate)
    
    app.route('/order-remove/:id')
        .get(user.orderRemove)
    
    //Local
    app.route('/orders')
        .get(user.isLoggedIn, order.orders)

    app.route('/order-add')
        .get(user.isLoggedIn, order.pageAdd)
        .post(user.isLoggedIn, order.orderAdd)

    app.route('/order-edit/:id')
        .get(user.isLoggedIn, order.pageEdit)
        .post(user.isLoggedIn, order.orderEdit)

    app.route('/order-delete/:id')
        .get(user.isLoggedIn, order.orderDelete)

    return app
}