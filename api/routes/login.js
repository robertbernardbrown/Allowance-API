const express = require("express");
const router  = express.Router();
const db      = require("../models");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
require("dotenv").config();

//Login a valid user
router.post("/", (req, res, next)=>{
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
                    token: token
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
});

module.exports = router;