var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose"),
    bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: { type: String, enum: ['admin', 'user'], default: 'user', required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', required: true }
}, {
    timestamps: true
})

userSchema.pre('save', function(next) {
    var user = this
    var SALT_FACTOR = 5
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

userSchema.pre("updateOne", function(next) {
	var user = this.getUpdate().$set
	var SALT_FACTOR = 5
	if (!user.password) return next()
	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)