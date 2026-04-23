const express = require("express");
const { body } = require("express-validator");
const userController = require("../../../controllers/user.controller");
const middleware = require("../../../middlewares/user.middleware");
const router = express.Router();

// register user
// second validation -> use express validator package
router.post("/register", [
    body("username").isLength({ min: 4 }).withMessage("Username must be of 4 Charcter!!"),
    body("email").isEmail().withMessage("Enter Valid Email!!"),
    body("password").isLength({ min: 6 }).withMessage("Password must be of 6 Character!!"),
], 
    userController.registerUser
);

// login user
router.post("/login", [
    body("email").isEmail().withMessage("Enter Valid Email!!"),
    body("password").isLength({ min: 6 }).withMessage("Password must be of 6 Character!!"),
], 
    userController.loginUser
);

// show profile
router.get("/profile", middleware.authUser, userController.profile);

//logout profile
router.get("/logout", middleware.authUser, userController.logout)

// update profile
router.put("/update", 
    middleware.authUser, 
    [
        body("username").isLength({ min: 4 }).withMessage("Username must be at least 4 characters"),
        body("email").isEmail().withMessage("Enter a valid email"),
        // VALIDATION FOR NEW PASSWORD
        body("newPassword")
            .optional({ checkFalsy: true }) // Only validates if the field is not empty
            .isLength({ min: 6 })
            .withMessage("New password must be at least 6 characters long!!"),
    ], 
    userController.updateUser
);


//forget password
router.post("/forget-password", userController.forgetPassword);

//reset password
router.post("/reset-password/:token",userController.resetPassword);

module.exports = router;