const orderModel = require("../models/order.model");
const productModel = require("../models/product.model")

// Create order

module.exports.CreateOrder = async ({userId, items}) => {

        let totalAmount = 0;
        let orderItems = [];


        for(let item of items){
            console.log(item);
            const productId = item.productId;
            const product = await productModel.findOne({_id: productId})

            if(!product)  throw new Error ("Product Not Found..");
            
            const itemsTotal = product.price * item.quantity;

            totalAmount += itemsTotal;

            orderItems.push(
                { 
                    productId: product._id,
                    quantity: item.quantity,
                    price: product.price,
                    total: itemsTotal
                });
        }

        return await orderModel.create({
            userId, 
            items: orderItems,
            totalbill: totalAmount,
        });
}


//get order history
module.exports.GetOrder = async (userId) =>{
   // .find() returns an array of all orders for that user
    // .sort({ _id: -1 }) ensures the most recent order is at the top
    return await orderModel.find({ userId }).sort({ _id: -1 });
}