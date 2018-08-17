const db = require("../models");
const checkAuth = require("../middleware/check-auth");

exports.users_get = (req, res, next)=>{
    db.User.findOne({where: {id: req.params.userId}})
    .then(result=>{
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
        res.status(500).json({
            message: "There was an error fetching your data!",
            error: err
        })
    })
}

exports.users_update_email = (req, res, next)=>{
    const newEmail = req.body
    db.User
    .findOne({where: {userEmail:req.body.userEmail}})
    .then(result => {
        if (result){
            res.status(409).json({
                message: "This email exists already, please try another."
            })
        } else {
            db.User
            .update(newEmail, {where: {id:req.params.userId}})
            .then(result=>{
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

exports.users_update_password = (req, res, next)=>{
    const passwordCheck = req.body.passwordCheck;
    db.User
    .findOne({where: {id:req.params.userId}})
    .then(result=>{
        if (result.dataValues.userPassword === passwordCheck){
            db.User
            .update({userPassword:req.body.userPassword}, {where: {id:req.params.userId}})
            .then(result=>{
                res.status(201).json({
                    message: "Password updated!",
                    result: result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: "Something went wrong!",
                    error: err
                })
            })
        } else {
            res.status(409).json({
                message: "Your old passwords didn't match!",
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: "Something went wrong!",
            error: err
        })
    })
}

exports.users_update_username = (req, res, next)=>{
    const newUsername = req.body
    db.User
    .update(newUsername, {where: {id:req.params.userId}})
    .then(result=>{
        res.status(201).json({
            message: "Username updated!",
            result: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: "Something went wrong!",
            error: err
        })
    })
}

exports.users_delete = (req, res, next)=>{
    db.User
    .destroy({where:{id:req.params.userId}})
    .then(result => {
        res.status(200).json({
            message: "User deleted"
        });
    })
    .catch(err=> {
        res.status(500).json({
            error:err
        });
    });
}