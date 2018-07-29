const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:userId", (req, res, next)=>{
    const id = req.params.userId;
    db.Transaction
    .findAll({where: {userId:id}})
    .then(result => {
        if (result.length){
            res.status(200).json({
                message: "Here are your budgets: ",
                result: result
            })
        } else {
            res.status(200).json({
                message: "You have no budgets to display yet",
            })
        }
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong fetching that budget!", error: err})
    })
});

router.put("/:userId", (req, res, next)=>{
    res.status(200).json({
        message: "Updated transaction!"
    })
});

router.post("/:userId", (req, res, next)=>{
    const transaction = {
        transactionType: req.body.transactionType,
        transactionAmount: req.body.transactionAmount,
        transactionReceipt: req.body.transactionReceipt,
        transactionMonth: req.body.transactionMonth,
        userId: req.params.userId
    }
    db.Transaction
    .create(transaction)
    .then(result => {
        res.status(201).json({message: "Posted new transaction!", budget: result})
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong posting that transaction!", error: err})
    })
});

router.delete("/:userId", (req, res, next)=>{
    res.status(200).json({
        message: "Deleted transaction!"
    })
});


module.exports = router;