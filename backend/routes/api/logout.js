const express = require("express");
const router = express.Router();
const logoutController = require("../../controllers/logoutController");

// استفاده از متد POST چون فرانت هم از POST استفاده کرده
router.post("/", logoutController.handleLogout);

module.exports = router;
