const wishlistModel = require("../models/wishlist.model");

// add items into wish list

module.exports.AddToWishlist = async ({ userId, items }) => {
    let wishlist = await wishlistModel.findOne({ userId });
    
    if(!wishlist){
    wishlist = new wishlistModel({ userId, productIds: [] });
    }
    
    wishlist.productIds.push(items);
    return await wishlist.save();
};