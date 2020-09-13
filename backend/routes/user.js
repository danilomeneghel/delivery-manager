const user = require('../controllers/user')

module.exports = (app) => {

    //API
    app.route('/users-list')
        .get(user.usersList)
    
    app.route('/user-create')
        .post(user.userCreate)
    
    app.route('/user-update/:id')
        .post(user.userUpdate)
    
    app.route('/user-remove/:id')
        .get(user.userRemove)
    
    //Local
    app.route('/users')
        .get(user.isLoggedIn, user.users)

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