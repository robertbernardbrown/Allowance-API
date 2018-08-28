const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

exports.balances_get = (req, res, next)=>{
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;
    db.Budget.findAll({
        include: [
            { model: db.Transaction}
        ],
        where: {
            budgetDate: {
                [Op.gt]: startDate,
                [Op.lt]: endDate,
            }
        }
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