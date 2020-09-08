var mongoose = require("mongoose"),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

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
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("User", userSchema)