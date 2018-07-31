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
    const newTransaction = {
        id: req.body.id,
        transactionType: req.body.transactionType,
        transactionAmount: req.body.transactionAmount,
        transactionReceipt: req.body.transactionReceipt,
        transactionMonth: req.body.transactionMonth,
        userId: req.params.userId
    }
    db.Transaction
    .update(newTransaction, {where:{id:newTransaction.id}})
    .then(result => {
        if (result[0]>0) {
            res.status(200).json({
                message: "Transaction updated!",
                result: result
            })
        } else {
            res.status(400).json({
                message: "We couldn't find a transaction to update there",
                result: result
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "There was an internal error processing that transaction!",
            error: err
        })
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
    db.Transaction
    .destroy({where:{id:req.body.id}})
    .then(result => {
        if (result) {
            res.status(200).json({
                message: "Deleted transaction!",
                result: result
            })
        } else {
            res.status(404).json({
                message: "We couldn\'t find a transaction to delete there",
                result: result
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "There was an internal server issue deleting that transaction",
            error: err
        })
    })



    
});


module.exports = router;