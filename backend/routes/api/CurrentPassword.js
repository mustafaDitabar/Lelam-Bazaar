const express = require("express");
const protectRoute = require("../../middlewares/protectRoute");
const router = express.Router();
const CurrentPasswordController = require("../../controllers/CurrentPasswordController")


router.post("/verify-password", protectRoute, CurrentPasswordController)

module.exports = router;