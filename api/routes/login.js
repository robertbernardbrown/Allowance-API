const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", (req, res, next)=>{
    const loginInfo = {
        userName: req.body.userName,
        userPassword: req.body.password
    }
    db.User.findOne({ where: loginInfo })
    .then(res=>{
        console.log(res);
        res.status(200).json({
            message: "Login success",
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