const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

exports.balances_get = (req, res, next)=>{
    let startDate = new Date("2017");
    // let endDate = new Date("2017-12-01");
    console.log(startDate);
    // console.log(endDate);
    db.Budget.findAll({
        include: [
            { model: db.Transaction}
        ],
        where: {
            budgetDate: {
                [Op.gt]: '2017-01-01',
                [Op.lt]: '2018-01-01',
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