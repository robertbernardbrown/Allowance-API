const express = require("express");
const router = express.Router();
const db = require("../models");
const querystring = require('querystring');
var url = require('url');

// GET all existing transactions for a user as default, can also specify transactions of certain type
router.get("/:userId/?:searchTerm?", (req, res, next)=>{
    const id = req.params.userId;
    const searchTerm = req.params.searchTerm
    const parsedTerm = querystring.parse(searchTerm)
    const parsedId = querystring.parse(id)
    console.log(parsedTerm)
    if (searchTerm){
        db.Transaction
        .findAll({where: [{userId:id}, parsedTerm]})
        .then(result => {
            if (result.length){
                res.status(200).json({
                    message: "Here are your transactions: ",
                    result: result
                })
            } else {
                res.status(200).json({
                    message: "You have no transactions to display yet",
                    result: result
                })
            }
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong fetching that transaction!", error: err})
        })
    } else {
        console.log("RUNNING")
        db.Transaction
        .findAll({where: {userId:id}})
        .then(result => {
            if (result.length){
                res.status(200).json({
                    message: "Here are your transactions: ",
                    result: result
                })
            } else {
                res.status(200).json({
                    message: "You have no transactions to display yet",
                })
            }
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong fetching that transaction!", error: err})
        })
    }
});

// PUT a transaction for a user
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

// POST a transaction for a user
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

//delete a transaction for a user
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