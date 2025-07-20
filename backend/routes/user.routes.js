const express = require("express");
const { getUsersForSidebar } = require("../controllers/user.controller"); // مسیر درست
const protectRoute = require("../middlewares/protectRoute");

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/", protectRoute, getUsersForSidebar);

module.exports = router;
