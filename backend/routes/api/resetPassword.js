const express = require("express");
const router = express.Router();
const ResetPassword = require("../../controllers/ResestPasswordControler");

router.post("/:id/:token", ResetPassword.handleResetPassword );

module.exports = router;
