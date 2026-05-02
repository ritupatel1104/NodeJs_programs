const mongoose = require("mongoose");
const cartModel = require("../models/cart.model");

// Add items to cart with logic to handle existing products
module.exports.addToCart = async ({ userId, item }) => {
    let cart = await cartModel.findOne({ userId });
    
    if (!cart) {
        cart = new cartModel({ userId, items: [] });
    }

    // DEBUG: Log this to your terminal to see what's happening
    console.log("Adding Product ID:", item.productId);

    const existingItemIndex = cart.items.findIndex((i) => {
        // We use .toString() on both sides to be 100% sure they match
        return i.productId.toString() === item.productId.toString();
    });

    if (existingItemIndex > -1) {
        // PRODUCT FOUND: Increment
        cart.items[existingItemIndex].quantity += (item.quantity || 1);
    } else {
        // PRODUCT NOT FOUND: Add new
        cart.items.push({
            productId: item.productId,
            quantity: item.quantity || 1
        });
    }

    return await cart.save();
};

module.exports.GetCart = async (userId) => {
    return await cartModel.findOne({ userId }).populate("items.productId");
};
// Remove the entire product row from cart
module.exports.RemoveSingleProduct = async ({ userId, productId }) => {
    let cart = await cartModel.findOne({ userId });
    if (!cart) throw new Error("Cart Not Found!!");

    const itemIndex = cart.items.findIndex((i) => i.productId.equals(productId));
    if (itemIndex < 0) throw new Error("Item Not Found!!");

    cart.items.splice(itemIndex, 1);
    return await cart.save();
};

module.exports.UpdateQuantity = async ({ userId, productId, quantity }) => {
    const cart = await cartModel.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());
    if (itemIndex === -1) throw new Error("Item not in cart");

    // Set the absolute quantity
    cart.items[itemIndex].quantity = quantity;
    return await cart.save();
};

