const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const BudgetsController = require("../controllers/budgets");

router.get("/:userId", checkAuth, BudgetsController.budgets_get);
router.post("/:userId", checkAuth, BudgetsController.budgets_create);
router.put("/:userId", checkAuth, BudgetsController.budgets_update);
router.delete("/:userId", checkAuth, BudgetsController.budgets_delete);

module.exports = router;