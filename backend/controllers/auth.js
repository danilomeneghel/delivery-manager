const passport = require("passport"),
    User = require("../models/user"),
    LocalStrategy = require("passport-local")

exports.index = (req, res) => {
    res.render("index")
}

exports.login = (req, res) => {
    res.render("login", { message: req.flash() })
}

exports.auth = (req, res, next) => { 
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())

    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: "Username or Password invalid"
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.logout()
    res.redirect("/login")
}

exports.pageRegister = (req, res) => {
    res.render("login", { message: {} })
}

exports.addRegister = (req,res) => {
    User.register(new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        role: "user",
        status: "active"
    }), req.body.password, 
    (err, user) => {
        if(err) return res.redirect('?error=' + err.message)

        passport.authenticate("local")(req, res, function(){
            res.render("login", { message: {'success': 'User successfully registered!'} })
        })
    })
}
