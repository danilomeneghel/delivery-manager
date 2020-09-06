var mongoose = require("mongoose")

var productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true }
}, 
{
    timestamps: true
})

productSchema.path('price').get(function(num) {
    return (num / 100).toFixed(2);
})

productSchema.path('price').set(function(num) {
    return num * 100;
})

module.exports = mongoose.model("Product", productSchema)