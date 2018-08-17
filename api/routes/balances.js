const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const BalancesController = require("../controllers/balances");

router.get("/:userId", checkAuth, BalancesController.balances_get);
router.put("/:userId", checkAuth, BalancesController.balances_update);
router.delete("/:userId", checkAuth, BalancesController.balances_delete);

module.exports = router;