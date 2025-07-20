// routes/conversations.js
const express = require("express");
const router = express.Router();
const { getConversationById } = require("../controllers/GetConversationID");
const protectRoute = require("../middlewares/protectRoute");

// GET /api/conversations/:id
router.get("/:id", protectRoute, getConversationById);

module.exports = router;
