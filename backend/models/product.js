var mongoose = require("mongoose")

var productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)