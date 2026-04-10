const userModel = require("../models/user.model");


//third validation --> check all field are not blank

module.exports.createUser = async ({username, email, password}) =>{
    if(!username || !email || !password){
        throw new Error ("All Field are Required");
    }
    const user = await userModel.create({username, email, password});

        return user;

};