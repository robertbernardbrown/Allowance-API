const express = require("express");
const router  = express.Router();
const LoginController = require("../controllers/login");

//Login a valid user
router.post("/", LoginController.user_login);

module.exports = router;