const passport = require("passport"),
    jwt = require("jsonwebtoken"),
    LocalStrategy = require("passport-local"),
    passportJWT = require("passport-jwt"),
    ExtractJWT = passportJWT.ExtractJwt,
    JWTStrategy = passportJWT.Strategy,
    User = require("../models/user")

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
            const token = jwt.sign(user.toJSON(), '#delivery@token', { expiresIn: 604800 });
            res.status(200).json({
                user: { "username": user.username, "role": user.role, "status": user.status },
                token: token
            });
        } else {
            res.status(401).json(info)
        }
	})(req, res)
}

exports.auth = (req, res, next) => { 
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: "Username or Password is invalid"
    })(req, res, next)
}

exports.index = (req, res) => {
    if(!req.isAuthenticated()) res.redirect("/login")

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

exports.addRegister = (req,res) => {
    User.register(new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        role: "user",
        status: "active"
    }), req.body.password, 
    (err) => {
        if(err) return res.redirect('?error=' + err.message)

        res.render("login", { message: {'success': 'User successfully registered!'} })
    })
}

exports.signUp = (req, res) => {
    User.register(new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        role: "user",
        status: "active"
    }), req.body.password, 
    (err, user) => {
        if(err) res.status(401).json(err.message)

        res.status(200).json({ success: 'User successfully registered!' });
    })
}
