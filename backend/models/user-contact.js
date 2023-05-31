var mongoose = require("mongoose")

var userContactSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("UserContact", userContactSchema)