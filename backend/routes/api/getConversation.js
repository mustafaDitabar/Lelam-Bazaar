const express = require('express');
const router = express.Router();
const protectRoute = require('../../middlewares/protectRoute');
const { getConversations, deleteConversation } = require("../../controllers/getConversationController");

// گرفتن مکالمات
router.get("/", protectRoute, getConversations);

// حذف مکالمه با آیدی
router.delete("/:id", protectRoute, deleteConversation);

module.exports = router;
