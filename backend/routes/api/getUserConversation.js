const express = require("express");
const router = express.Router();
const { getUserConversations } = require("../../controllers/getUserConversationController");
const protectRoute = require("../../middlewares/protectRoute");

router.get("/conversationUsers", protectRoute, getUserConversations);

module.exports = router;
