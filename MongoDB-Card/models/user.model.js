const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Usercard11");

let userSchema = mongoose.Schema({

    fullname: String,
    username: String,
    email: String,
    image: String,
},
    { timeStamps: true },

);
module.exports = mongoose.model("User_data", userSchema);


