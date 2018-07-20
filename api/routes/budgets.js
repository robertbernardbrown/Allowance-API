const express = require("express");
const router = express.Router();
var db = require("../models");

router.get("/:userId", (req, res, next)=>{
    const id = req.params.userId;
    console.log(id)
    if (id === "special") {
        res.status(200).json({
            message: "Secret code!",
            id: id
        })
    } else { 
        res.status(200).json({
            message: "You passed an ID"
        })
    }
});

router.post("/:userId", (req, res, next)=>{
    const budget = {
        budget: req.body.budget,
        budgetMonth: req.body.budgetMonth,
        userId: req.params.userId
    }
    db.Budget
    .create(budget)
    .then(result => {
        res.status(201).json({message: "Posted new budget!", budget: result})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Something went wrong posting that budget!", error: err})
    })
});

router.put("/:userId", (req, res, next)=>{
    res.status(200).json({
        message: "Updated budget!"
    })
});

router.delete("/:userId", (req, res, next)=>{
    res.status(200).json({
        message: "Deleted budget!"
    })
});


module.exports = router;