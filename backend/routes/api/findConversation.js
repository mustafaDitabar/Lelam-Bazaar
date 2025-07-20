const express = require('express');
const router = express.Router();
const protectRoute = require('../../middlewares/protectRoute');
const {findConversation}   = require('../../controllers/findConversationController');

// روت برای پیدا کردن مکالمه بین دو کاربر
router.get('/find/:userId/:sellerId', protectRoute, findConversation);

module.exports = router;
