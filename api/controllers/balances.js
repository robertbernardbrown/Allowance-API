const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

/**
 * Helps balances_get to return correct dates in query search
 * @param {date} start - date to start search from
 * @param {date} end - date to end search
 */
function getHelper(start, end){
    if (start && end) {
        return {
            [Op.gte]: start,
            [Op.lte]: end,
        }
    }
    else if (start){
        return {
            [Op.gte]: start,
        }
    }
}

exports.balances_get = (req, res, next)=>{
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id = req.params.userId;
    db.Budget.findAll({
        include: [{ 
            model: db.Transaction,
            where: {
                transactionDate: getHelper(startDate, endDate),
                userId:id
            },
            required: false
        }],
        where: {
            budgetDate: getHelper(startDate, endDate),
            userId:id
        }
    }).then(function(data) {
        if (data.length >= 1) {
            let reducedArr = [];
            data.map((cur) => {
                let budget = cur.budget;
                cur.Transactions.map((innerCur) => {
                    if (innerCur.transactionType === "add") {
                        budget = budget + innerCur.transactionAmount;
                    }
                    else if (innerCur.transactionType === "subtract") {
                        budget = budget - innerCur.transactionAmount;
                    }
                })
                let reducedBudgetItem = {budget: budget, budgetDate: cur.budgetDate}
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