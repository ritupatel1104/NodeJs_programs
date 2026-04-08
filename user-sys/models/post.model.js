const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/user-sys11");

let postSchema = mongoose.Schema({
    
   userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
   title: String,
   description: String,
   imgurl: String,
},
{timestamps: true},
);
module.exports = mongoose.model("post",postSchema);