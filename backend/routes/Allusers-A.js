const express = require("express");
const { AllUsrs } = require("../controllers/AllUsersController-A"); // مسیر درست
const protectRoute = require("../middlewares/protectRoute");

const router = express.Router();

router.get("/", protectRoute, AllUsrs);

module.exports = router;
