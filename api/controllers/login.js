const db      = require("../models");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
require("dotenv").config();

  /**
   * Validate the login form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean validation result,
   *                   errors tips, and a global message for the whole form.
   */
  function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
  
    if (!payload || typeof payload.userEmail !== 'string' || payload.userEmail.trim().length === 0) {
      isFormValid = false;
      errors.userEmail = 'Please provide your email address.';
    }
  
    if (!payload || typeof payload.userPassword !== 'string' || payload.userPassword.trim().length === 0) {
      isFormValid = false;
      errors.userPassword = 'Please provide your password.';
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

exports.user_login = (req, res, next)=>{

    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    db.User.findOne({ where: {userEmail: req.body.userEmail} })
    .then(result=>{
        if (!result) {
            return res.status(400).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.userPassword, result.dataValues.userPassword, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Auth failed"
                });
            }
            if (data) {
                const token = jwt.sign({
                    email: result.dataValues.userEmail,
                    userId: result.dataValues.id
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                })
                return res.status(200).json({
                    message: "Auth successful",
                    token: token,
                    userId: result.dataValues.id
                });
            }
            res.status(400).json({
                message: "Auth failed"
            });
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    })
}