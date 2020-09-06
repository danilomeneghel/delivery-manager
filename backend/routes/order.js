const order = require('../controllers/order'),
    user = require('../controllers/user')

module.exports = (app) => {

    app.route('/orders-list')
        .get(order.orders)
    
    app.route('/orders')
        .get(user.isLoggedIn, order.orderList)

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