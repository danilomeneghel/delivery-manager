const userContact = require('../controllers/user-contact'),
    user = require('../controllers/user')

module.exports = (app) => {

    //API
    app.route('/users-contacts-list')
        .get(userContact.usersContactsList)
    
    app.route('/user-contact-create')
        .post(userContact.userContactCreate)
    
    app.route('/user-contact-update/:id')
        .post(userContact.userContactUpdate)
    
    app.route('/user-contact-remove/:id')
        .get(userContact.userContactRemove)
    
    //Local
    app.route('/users-contacts')
        .get(user.isLoggedIn, userContact.usersContacts)

    app.route('/user-contact-add')
        .get(user.isLoggedIn, userContact.pageAdd)
        .post(user.isLoggedIn, userContact.userContactAdd)

    app.route('/user-contact-edit/:id')
        .get(user.isLoggedIn, userContact.pageEdit)
        .post(user.isLoggedIn, userContact.userContactEdit)

    app.route('/user-contact-delete/:id')
        .get(user.isLoggedIn, userContact.userContactDelete)

    return app
}