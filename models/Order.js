const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: [{ name: String, quantity: Number }],
    orderDate: { type: Date, default: Date.now },
    certification: { type: Boolean, default: false }
});

module.exports = mongoose.model('Order', OrderSchema);
