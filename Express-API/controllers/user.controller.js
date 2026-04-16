const userService = require("../services/user.service");
const { validationResult, check } = require("express-validator");
const userModel = require("../models/user.model")

module.exports.registerUser = async (req, res) => {
    const error =  validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }

    const { username, email, password } = req.body;

    //check user is already register or not
    let isExist = await userModel.findOne({email: email});

    if(isExist){
        return res.status(400).json({ message: "User is already register"})
    }


    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
         username,
         email, 
         password: hashPassword,

    });

    let token = await user.generateAuthToken();

    res.status(200).json({token, user});

};

module.exports.loginUser = async (req, res) => {
    let error = validationResult(req);
    
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {email, password} = req.body;

    let checkUser = await userModel.findOne({email: email}).select("+password");
    if(!checkUser){
        res.status(401).json({message: "User Not exists!!! Register first"});
    }

    const isMatch =  await checkUser.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message: "Wrong Password"})
    }

    const token = checkUser.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({token, checkUser})


}


module.exports.profile =(req,res)=>{
    res.status(200).json({user: req.user});
}

module.exports.logout = (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message: "User Logout Successfully !!"})
}


module.exports.updateUser = async (req, res) => {
    // 1. Check for Validation Errors (from your route rules)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    try {
        // Fetch user and include password for comparison
        const user = await userModel.findById(userId).select("+password");

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // 2. Password Change Logic
        if (newPassword && newPassword.trim() !== "") {
            // Check if oldPassword was even provided in the request
            if (!oldPassword) {
                return res.status(400).json({ message: "Please provide current password to set a new one." });
            }

            // Verify if the current password is correct
            const isMatch = await user.comparePassword(oldPassword);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password is incorrect!" });
            }

            // Hash and update the new password
            user.password = await userModel.hashPassword(newPassword);
        }

        // 3. Update Other Fields
        user.username = username || user.username;
        user.email = email || user.email;
        
        // Save the document (Mongoose will trigger pre-save hooks if any)
        await user.save();

        // Remove password from the response object for security
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({ 
            message: "Profile updated successfully!", 
            user: userResponse 
        });

    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ message: "Server error during profile update" });
    }
};

