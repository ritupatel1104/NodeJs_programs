const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../../../controllers/user.controller")
const middleWare = require("../../../middlewares/user.middleware")


//Register user
//Second Validation -- use express validator package
router.post('/register',[
    body('username').isLength({min: 4}).withMessage("Username must be of 4 character"),
    body('email').isEmail().withMessage("Enter Valid Email"),
    body('password').isLength({min: 6}).withMessage("Password must be of 6 character"),
], userController.registerUser,

);


//login user
router.post('/login',[
    body('email').isEmail().withMessage("Enter Valid Email"),
    body('password').isLength({min: 6}).withMessage("Password must be of 6 character"),
],userController.loginUser
);


//show profile
router.get("/profile", middleWare.authUser, userController.profile)


//logout user
router.get("/logout", middleWare.authUser, userController.logout)


router.put("/update",middleWare.authUser, 
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


module.exports = router;


