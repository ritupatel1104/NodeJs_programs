const wishlistModel = require("../models/wishlist.model");

// add items into wish list

module.exports.AddToWishlist = async ({ userId, items }) => {
    let wishlist = await wishlistModel.findOne({ userId });
    
 if (!wishlist) {
        wishlist = new wishlistModel({ userId, productIds: [] });
    }

    // 3. Safeguard: Check for duplicates only if there are items in the array
    // We add optional chaining (?.) and a check for p.items to avoid "null" errors
    const isDuplicate = wishlist.productIds && wishlist.productIds.some(p => 
        p?.items?.productId?.toString() === items.items.productId.toString()
    );

    if (isDuplicate) {
        throw new Error("Already in Wishlist!");
    }

    wishlist.productIds.push(items);
    return await wishlist.save();
};

// GET wishlist with full product details
module.exports.GetWishlist = async (userId) => {
    // Path matches your Schema: productIds -> items -> productId
    return await wishlistModel.findOne({ userId })
        .populate({
            path: 'productIds.items.productId',
            model: 'product' 
        });
};

// Remove single item from wishlist
module.exports.RemoveFromWishlist = async ({ userId, entryId }) => {
    // We use findOneAndUpdate with $pull to remove the item from the array in one step
    const wishlist = await wishlistModel.findOneAndUpdate(
        { userId },
        { 
            $pull: { productIds: { _id: entryId } } 
        },
        { new: true } // returns the updated document
    );

    if (!wishlist) throw new Error("Wishlist not found or item already removed");
    
    return wishlist;
};