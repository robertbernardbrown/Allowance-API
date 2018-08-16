const express = require("express");
const router  = express.Router();
const db      = require("../models");
const bcrypt = require("bcryptjs");

//Register a new user if they don't exist already
router.post("/", (req, res, next)=>{
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
});

module.exports = router;