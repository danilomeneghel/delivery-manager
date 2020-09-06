const userContact = require('../controllers/user-contact'),
    user = require('../controllers/user')

module.exports = (app) => {

    app.route('/users-contacts-list')
        .get(userContact.usersContacts)
    
    app.route('/users-contacts')
        .get(user.isLoggedIn, userContact.userContactList)

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