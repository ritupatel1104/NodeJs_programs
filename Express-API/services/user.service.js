const userModel = require("../models/user_model");
const crypto = require('crypto')
const nodemailer = require('nodemailer');



// third validation -> check all field are not blank 

module.exports.createUser = async ({ username, email, password, role }) => {
    if(!username || !email || !password){
        throw new Error("All Field Are Required!!")
    }
    const user = await userModel.create({ username, email, password, role });
    return user;
};

//forget password
const transporter = nodemailer.createTransport({service : "gmail",
    auth:{
        user: process.env.NODE_EMAIL,
        pass: process.env.NODE_PASSWORD,
    },
});