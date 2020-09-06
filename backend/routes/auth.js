const auth = require('../controllers/auth'),
    user = require('../controllers/user')

module.exports = (app) => {

    app.route('/')
        .get(user.isLoggedIn, auth.index)
    
    app.route('/login')
        .get(auth.login)
        .post(auth.auth)
    
    app.route('/logout')
        .get(auth.logout)

    app.route('/register')
        .get(auth.pageRegister)
        .post(auth.addRegister)

    return app
}