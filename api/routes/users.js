const express = require("express");
const router = express.Router();

router.get("/:userId", (req, res, next)=>{
    const id = req.params.userId;
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

router.put("/:userId", (req, res, next)=>{
    res.status(200).json({
        message: "Updated user!"
    })
});

router.delete("/:userId", (req, res, next)=>{
    res.status(200).json({
        message: "Deleted user!"
    })
});


module.exports = router;