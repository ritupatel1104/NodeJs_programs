const express = require("express");
const router = express.Router()
const userMiddleware = require("../../../middlewares/user.middleware");
const wishlistController = require("../../../controllers/wishlist.controller");


// add into wishlist
router.post("/add", userMiddleware.authUser, wishlistController.AddToWishlist);

// remove item from wishlist



module.exports = router