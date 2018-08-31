const db = require("../models");
const querystring = require('querystring');

exports.transactions_get = (req, res, next)=>{
    const id = req.params.userId;
    const searchTerm = req.params.searchTerm
    const parsedTerm = querystring.parse(searchTerm)
    if (searchTerm){
        db.Transaction
        .findAll({where: [{UserId:id}, parsedTerm]})
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
        db.Transaction
        .findAll({where: {UserId:id}})
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
}

exports.transactions_update = (req, res, next)=>{
    const newTransaction = {
        id: req.body.id,
        transactionType: req.body.transactionType,
        transactionAmount: req.body.transactionAmount,
        transactionReceipt: req.body.transactionReceipt,
        transactionDate: req.body.transactionDate,
        UserId: req.params.userId,
        BudgetId: req.body.budgetId
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
    
}

exports.transactions_post = (req, res, next)=>{
    const transaction = {
        transactionType: req.body.transactionType,
        transactionAmount: req.body.transactionAmount,
        transactionReceipt: req.body.transactionReceipt,
        transactionDate: req.body.transactionDate,
        UserId: req.params.userId,
        BudgetId: req.body.budgetId
    }
    db.Transaction
    .create(transaction)
    .then(result => {
        res.status(201).json({message: "Posted new transaction!", budget: result})
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong posting that transaction!", error: err})
    })
}

exports.transactions_delete = (req, res, next)=>{
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
}