const express = require("express");
const router = express.Router();
const db = require("../models");

//Get current user information
router.get("/:userId", (req, res, next)=>{
    db.User.findOne({where: {id: req.params.userId}})
    .then(result=>{
        console.log(result);
        if (result) {
            res.status(200).json({
                message: "Here's your information",
                info: result
            })
        } else {
            res.status(404).json({
                message: "We can't find your information!",
                info: result
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: "There was an error fetching your data!",
            error: err
        })
    })
});

//Change selected user account property
router.put("/:userId", (req, res, next)=>{
    const updateProp = req.body
    if (Object.keys(updateProp)[0] === "userEmail") {
        db.User
        .findOne({where: {userEmail:req.body.userEmail}})
        .then(result => {
            console.log(result);
            if (result){
                res.status(200).json({
                    message: "This email exists already, please try another."
                })
            } else {
                db.User
                .update(updateProp, {where: {id:req.params.userId}})
                .then(result=>{
                    console.log(result);
                    res.status(201).json({
                        message: "Email updated!",
                        result: result
                    })
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error fetching the data!",
                result: err
            })
        })
    }
    db.User
    .update(updateProp, {where: {id:req.params.userId}})
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: Object.keys(updateProp) + " updated!",
            result: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: "Something went wrong!",
            error: err
        })
    })
});

//Delete user account
router.delete("/:userId", (req, res, next)=>{
});


module.exports = router;