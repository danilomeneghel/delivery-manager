const auth = require('../controllers/auth'),
    user = require('../controllers/user')

module.exports = (app) => {

    app.route('/')
        .get(auth.index)
    
    app.route('/signIn')
        .post(auth.signIn)
    
	app.route('/login')
        .get(auth.login)
        .post(auth.auth)
    
    app.route('/logout')
        .get(auth.logout)

    app.route('/register')
        .get(auth.pageRegister)
        .post(auth.addRegister)

    app.route('/signUp')
        .post(auth.signUp)
    
    return app
}