const db = require("../models");

exports.balances_get = (req, res, next)=>{
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
}

exports.balances_update = (req, res, next)=>{
    res.status(200).json({
        message: "Updated balances!"
    })
}

exports.balances_delete = ((req, res, next)=>{
    res.status(200).json({
        message: "Deleted balances!"
    })
})