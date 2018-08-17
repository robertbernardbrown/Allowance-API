const express = require("express");
const router  = express.Router();
const RegisterController = require("../controllers/register");

//Register a new user if they don't exist already
router.post("/", RegisterController.user_register);

module.exports = router;