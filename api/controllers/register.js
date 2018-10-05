const db        = require("../models");
const bcrypt    = require("bcryptjs");
const validator = require("validator");

/**
 * Validate the sign up form
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
    if (!payload || typeof payload.userEmail !== 'string' || !validator.isEmail(payload.userEmail)) {
        isFormValid = false;
        errors.userEmail = 'Please provide a correct email address.';
    }
    if (!payload || typeof payload.userPassword !== 'string' || payload.userPassword.trim().length < 8) {
        isFormValid = false;
        errors.userPassword = 'Password must have at least 8 characters.';
    }
    if (!payload || typeof payload.userName !== 'string' || payload.userName.trim().length === 0) {
        isFormValid = false;
        errors.userName = 'Please provide your name.';
    }
    if (!isFormValid) {
        message = 'Check the form for errors.';
    }
    return {
        success: isFormValid,
        message,
        errors
    };
}

exports.user_register = (req, res, next)=>{

    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success){
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    } 

    db.User
    .findOne({where: {userEmail: req.body.userEmail}})
    .then((user) => {
        if (user) {
            res.status(409).json({
                message: "User exists already with that email!"
            })
        } else {
            bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error:err
                    });
                } else {
                    const userInfo = {
                        userName: req.body.userName,
                        userEmail: req.body.userEmail,
                        userPassword: hash
                    }
                    db.User
                    .create(userInfo)
                    .then((result) => {
                        res.status(201).json({
                            message: "User created!"
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: "There was an error processing your information",
                            error: err
                        })
                    })
                }
            });
            
        }
    })
}