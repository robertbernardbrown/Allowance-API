const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

exports.balances_get = (req, res, next)=>{
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;
    db.Budget.findAll({
        include: [{ 
            model: db.Transaction,
            where: {
                transactionDate: {
                    [Op.gt]: startDate,
                    [Op.lt]: endDate,
                }
            },
            required: false
        }],
        where: {
            budgetDate: {
                [Op.gt]: startDate,
                [Op.lt]: endDate,
            }
        }
    }).then(function(data) {
        if (data.length >= 1) {
            let reducedArr = [];
            data.map((cur) => {
                let budget = cur.budget;
                cur.Transactions.map((innerCur) => {
                    if (innerCur.transactionType === "Add") {
                        budget = budget + innerCur.transactionAmount;
                    }
                    else if (innerCur.transactionType === "Subtract") {
                        budget = budget - innerCur.transactionAmount;
                    }
                })
                let reducedBudgetItem = {[cur.budgetDate]: budget}
                reducedArr.push(reducedBudgetItem)
            })
            res.status(200).json({
                message: "Here are your transactions:",
                transactions: reducedArr
            })
        }
        else {
            res.status(200).json({
                message: "You don't have any transactions or budgets for this time period",
            })
        }
    }).catch(err=>{
        res.status(500).json({
            message: "There was an error fetching this data",
            err: err
        })
    })
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