const db = require("../models");

exports.budgets_get = (req, res, next)=>{
    const id = req.params.userId;
    db.Budget
    .findAll({
        where: {
            userId:id
        }, 
        order: [
            ["budgetDate", "ASC"]
        ]
    })
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
};

exports.budgets_create = (req, res, next)=>{
    const budget = {
        budget: req.body.budget,
        budgetDate: req.body.budgetDate,
        userId: req.params.userId
    }
    db.Budget
    .create(budget)
    .then(result => {
        res.status(200).json({message: "Posted new budget!", budget: result})
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong posting that budget!", error: err})
    })
}

exports.budgets_update = (req, res, next)=>{
    const newBudget = {
        budget: req.body.newBudget,
        budgetDate: req.body.budgetDate,
        userId: req.params.userId
    }
    db.Budget
    .update(newBudget, {where:{userId:req.params.userId, budgetDate:newBudget.budgetDate}})
    .then(result => {
        if (result[0]>0){
            res.status(201).json({message: "Updated budget!", budget: result})
        } else {
            res.status(400).json({message: "You don't seem to have a budget to update there yet!"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong updating that budget!", error: err})
    })
}

exports.budgets_delete = (req, res, next)=>{
    const deleteBudget = {
        budgetDate: req.body.budgetDate,
        userId: req.params.userId
    }
    db.Budget
    .destroy({where:deleteBudget})
    .then(result => {
        if (result){
            res.status(200).json({
                message: "Budget deleted!",
                result: result
            })
        } else {
            res.status(200).json({
                message: "You don't have a budget there to delete!",
            })
        }
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong updating that budget!", error: err})
    })
}