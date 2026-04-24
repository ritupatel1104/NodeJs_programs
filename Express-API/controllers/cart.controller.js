const cartModel = require("../models/cart.model");
const cartService = require("../services/cart.service");

//add to cart
module.exports.AddToCart = async (req,res) =>{
    try {
        const userId = req.user.id;
        const {item} = req.body;

        const Exist = await cartModel.findOne({userId})
        const existProduct = Exist.items.map((val)=>{
            const ids = val.productId;
            return ids;
        })
        
        existProduct.forEach((e)=>{
            if(e.equals(item.productId)){
                return res.status(400).json({message: "Product Already Is added in cart"})
            }
        });

        const cart = await cartService.addToCart({userId, item});

        return res.status(200).json({message: "Item added to cart successfully", cart});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

//Get Cart
module.exports.GetCart = async (req , res) => {
    try {
        const userId = req.user.id;

        let cart = await cartService.GetCart(userId);

        if (!cart) {
            return res.status(404).json({message : "Cart Not Found"})
        }

        return res.status(200).json({message : "Cart Data Fetch Successfully" , cart});
        
    } catch (error) {
        return res.status(400).json({message : error.message})
    }
}

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

