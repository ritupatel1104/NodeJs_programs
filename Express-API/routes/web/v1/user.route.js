const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();

//Register user
//Second Validation -- use express validator package
router.post('/register',[
    body('username').isLength({min: 4}).withMessage("Username must be of 4 character"),
    body('email').isEmail().withMessage("Enter Valid Email"),
    body('password').isLength({min: 6}).withMessage("Password must be of 6 character"),
])




module.exports = router;


