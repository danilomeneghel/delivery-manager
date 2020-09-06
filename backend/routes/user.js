const user = require('../controllers/user')

module.exports = (app) => {

    app.route('/users-list')
        .get(user.users)
    
    app.route('/users')
        .get(user.isLoggedIn, user.userList)

    app.route('/user-add')
        .get(user.isLoggedIn, user.pageAdd)
        .post(user.isLoggedIn, user.userAdd)

    app.route('/user-edit/:id')
        .get(user.isLoggedIn, user.pageEdit)
        .post(user.isLoggedIn, user.userEdit)

    app.route('/user-delete/:id')
        .get(user.isLoggedIn, user.userDelete)

    app.route('/profile')
        .get(user.isLoggedIn, user.pageProfile)
        .post(user.isLoggedIn, user.editProfile)

    return app
}