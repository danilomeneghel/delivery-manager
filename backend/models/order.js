var mongoose = require("mongoose")

var orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: { type: Number, required: true, default: 1 },
    deliveryDate: { type: Date, required: true },
    note: { type: String, required: true }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)