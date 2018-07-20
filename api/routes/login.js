const express = require("express");
const router = express.Router();
const db = require("../models");


router.post("/", (req, res, next)=>{
    const loginInfo = {
        userName: req.body.userName,
        userPassword: req.body.password
    }
    db.User.findOne({ where: {userName: req.body.userName} })
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: "Login success",
            result: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message: "Something went wrong",
            error: err
        })
    })
});

module.exports = router;