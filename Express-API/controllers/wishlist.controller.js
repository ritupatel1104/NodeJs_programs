const wishlistService = require('../services/wishlist.service');
// add items to wishlist
module.exports.AddToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items } = req.body;
        const wishlist = await wishlistService.AddToWishlist({ userId, items });

        if(!wishlist){
            return res.status(404).json({message: "Product Not Found..."})
        }

        return res.status(200).json({message: "Add Item into wishlist",wishlist})
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}