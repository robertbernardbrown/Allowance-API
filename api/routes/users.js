const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const UsersController = require("../controllers/users");

router.get("/:userId", checkAuth, UsersController.users_get);
router.put("/:userId/email", checkAuth, UsersController.users_update_email);
router.put("/:userId/password", checkAuth, UsersController.users_update_password); 
router.put("/:userId/userName", checkAuth, UsersController.users_update_username);
router.delete("/:userId", checkAuth, UsersController.users_delete);

module.exports = router;