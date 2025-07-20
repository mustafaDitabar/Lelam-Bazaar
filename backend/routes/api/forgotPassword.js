const express = require("express");
const router = express.Router();
const ForgotPasswordControler = require("../../controllers/ForgotPasswordControler");

router.post("/", ForgotPasswordControler.handleForgotPassword);

module.exports = router;
