const passport = require("passport"),
    jwt = require("jsonwebtoken"),
    LocalStrategy = require("passport-local"),
    passportJWT = require("passport-jwt"),
    ExtractJWT = passportJWT.ExtractJwt,
    JWTStrategy = passportJWT.Strategy,
	mongoose = require('mongoose'),
    User = require("../models/user")

var ObjectId = mongoose.Types.ObjectId

passport.use(new LocalStrategy({ usernameField: "username" },
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) return done(err)

            if (user) {
                user.comparePassword(password, function(err, isMatch) {
                    if (err) return done(null, false)

                    if (!isMatch) {
                        return done(null, false, {
                            password: "Password is wrong"
                        })
                    } else {
                        return done(null, user)
                    }
                })
            } else {
                return done(null, false, {
                    username: "Username not found"
                })
            }
        })
    })
)

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : '#delivery@token'
    },
    function (jwtPayload, cb) {
        return User.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user)
            })
            .catch(err => {
                return cb(err)
            })
    }
))

exports.signIn = (req, res) => { 
    passport.authenticate("local", function(err, user, info) {
        if (err) res.status(404).json(err)

        if (user) {
            const token = jwt.sign(user.toJSON(), '#delivery@token', { expiresIn: 604800 })
            res.status(200).json({ token: token })
        } else {
            res.status(401).json(info)
        }
	})(req, res)
}

exports.signUp = (req, res) => {
    User.create(req.body)
    .then((result) => {
        if (!result) return res.status(400).json({ error: result })

        res.status(201).json({ result: result, success: 'User successfully registered!' })
    })
    .catch(err => {
        return res.status(400).json({ error: err })
    })
}

exports.auth = (req, res, next) => { 
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: "Username or Password is invalid"
    })(req, res, next)
}

exports.index = (req, res) => {
    res.render("index")
}

exports.login = (req, res) => {
    res.render("login", { message: req.flash() })
}

exports.logout = (req, res) => {
    req.logout()
    res.redirect("/login")
}

exports.pageRegister = (req, res) => {
    res.render("login", { message: {} })
}

exports.addRegister = (req, res) => {
    User.create(req.body)
    .then((result) => {
        if(!result) return res.redirect('?error=' + result)

        res.render("login", { message: {'success': 'User successfully registered!'} })
    })
    .catch(err => {
        return res.redirect('?error=' + err)
    })
}
