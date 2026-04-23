const mongoose = require("mongoose");

const CartSchema =  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items:[
        {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
        quantity: Number,
    }]
});

module.exports = mongoose.model("Cart", CartSchema);
