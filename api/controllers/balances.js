const db = require("../models");

exports.balances_get = (req, res, next)=>{
    db.Budget.findAll({
        include: [
            { model: db.Transaction}
        ]
    }).then(function(transactions) {
        console.log(transactions.Budgets);
        res.status(200).json({
            message: "Here are your transactions:",
            transactions: transactions
        })
    }).catch(err=>{console.log(err)})
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