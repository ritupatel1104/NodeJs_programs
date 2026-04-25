const express = require('express');
const router = express.Router();
const userMiddleware = require("../../../middlewares/user.middleware");
const orderController = require("../../../controllers/order.controller")

//create order
router.post("/add",userMiddleware.authUser,orderController.CreateOrder);


//get order - show history of recent order
router.get("/all",userMiddleware.authUser, orderController.GetOrder);


//remove items for order

//cancel order

module.exports = router;