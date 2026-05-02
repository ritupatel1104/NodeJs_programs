const wishlistService = require('../services/wishlist.service');
const wishlistModel = require("../models/wishlist.model");

// Ensure it's module.exports.FunctionName
module.exports.AddToWishlist = async (req, res) => {
  try {
        const userId = req.user.id;
        const { productId } = req.body;

        // Validation: If productId is missing from request
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const items = { items: { productId } };
        const wishlist = await wishlistService.AddToWishlist({ userId, items });
        
        return res.status(200).json({ message: "Added to wishlist", wishlist });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Check this function name carefully!
module.exports.GetWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await wishlistService.GetWishlist(userId);
        if (!wishlist) {
            return res.status(200).json({ wishlist: { productIds: [] } });
        }
        return res.status(200).json({ wishlist });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Remove Item Controller
module.exports.RemoveItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const entryId = req.params.id; // This matches the /remove/:id in your route

        if (!entryId) {
            return res.status(400).json({ message: "Entry ID is required" });
        }

        await wishlistService.RemoveFromWishlist({ userId, entryId });
        
        return res.status(200).json({ message: "Item removed successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};