const express = require("express");
const router  = express.Router();
const db      = require("../models");

//Register a new user if they don't exist already
router.post("/", (req, res, next)=>{
    const userInfo = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword
    }
    db.User
    .findOrCreate({where: {userEmail: req.body.userEmail}, defaults: userInfo})
    .spread((user, created) => {
        console.log(user.get({
          plain: true
        }))
        console.log(created)
        if (created) {
            res.status(201).json({
                message: "User created!"
            })
        } else {
            res.status(400).json({
                message: "User exists already with that email!"
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
});

module.exports = router;