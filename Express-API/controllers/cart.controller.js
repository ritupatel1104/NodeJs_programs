const cartModel = require("../models/cart.model");
const cartService = require("../services/cart.service");

//add to cart
module.exports.AddToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { item } = req.body;
        // Check if cart exists first to avoid errors on .items map
        const existCart = await cartModel.findOne({ userId });
        if (existCart) {
            const isDuplicate = existCart.items.some(val => val.productId.equals(item.productId));
            if (isDuplicate) return res.status(400).json({ message: "Product already in cart" });
        }

        const cart = await cartService.addToCart({ userId, item });
        return res.status(200).json({ message: "Item added", cart });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.GetCart = async (req, res) => {
    try {
        const userId = req.user.id;
        // Crucial: Call service that has .populate()
        const cart = await cartService.GetCart(userId);
        if (!cart) return res.status(200).json({ cart: { items: [] } });
        return res.status(200).json({ cart });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
// Remove single item from  cart
module.exports.RemoveItem = async (req , res) => {
    try {
        const userId = req.user.id;
        const  productId = req.params.id;

       let cart = await cartService.RemoveSingleProduct({userId , productId});

        // if (!cart) return res.status(404).json({message: "Product Not Found"});
        
        return res.status(200).json({message: "Remove Items From Cart Successfully"});

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//upgrade quantity from cart
module.exports.UpdateQty = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const cart = await cartService.UpdateQuantity({ userId, productId, quantity });
        return res.status(200).json({ message: "Quantity updated", cart });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};