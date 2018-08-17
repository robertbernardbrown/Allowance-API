const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactions");

// GET all existing transactions for a user as default, can also specify transactions of certain type
router.get("/:userId/:searchTerm?", checkAuth, TransactionController.transactions_get);
router.put("/:userId", checkAuth, TransactionController.transactions_update);
router.post("/:userId", checkAuth, TransactionController.transactions_post);
router.delete("/:userId", checkAuth, TransactionController.transactions_delete);

module.exports = router;