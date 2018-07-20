const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:userId", (req, res, next)=>{
    const id = req.params.userId;
    if (id === "special") {
        res.status(200).json({
            message: "Secret code!",
            id: id
        })
    } else { 
        res.status(200).json({
            message: "You passed an ID"
        })
    }
});

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
                message: "User exists already"
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
});

router.put("/:userId", (req, res, next)=>{
    res.status(200).json({
        message: "Updated user!"
    })
});

router.delete("/:userId", (req, res, next)=>{
    res.status(200).json({
        message: "Deleted user!"
    })
});


module.exports = router;