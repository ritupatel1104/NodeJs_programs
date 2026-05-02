const express = require("express");
const router = express.Router();
const userMiddleware = require("../../../middlewares/user.middleware");
const cartController = require("../../../controllers/cart.controller");



//add items
router.post("/add", userMiddleware.authUser, 
    cartController.AddToCart);

//get all items
// Make sure there are no extra spaces in "/all"
router.get("/all", userMiddleware.authUser, cartController.GetCart);

//remove single item from cart
router.delete("/product/:id", userMiddleware.authUser,
    cartController.RemoveItem);

// This allows you to change quantity without being blocked by the "Duplicate" check
router.put("/update-quantity", userMiddleware.authUser, cartController.UpdateQty);


module.exports = router;