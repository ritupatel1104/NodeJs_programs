const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Database validation
let userSchema = mongoose.Schema({
    username:{
        type: String,
        minlength: 4,
        unique: true,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false, // when we apply findOne query and if we give select false then it will not add in response
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
});


//jwt token
userSchema.methods.generateAuthToken = function (){
    let token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET,
         {expiresIn: "7d",
        });
        return token;
};//this.id --> refres to database user's id


//bcrypt

//hash(static)
userSchema.static.hashPassword =  async function(){
    let hash = await bcrypt.hash(password, 10);
    return hash;
}

//compare(methods)
userSchema.methods.comparePassword =  async function (){
 let result = await bcrypt.compare(password, this.password);
} // this.password --> database's password


module.exports = mongoose.model("Users", userSchema)