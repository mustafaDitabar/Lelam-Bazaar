// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getCategoryStats } = require('../controllers/Chart-Controller-A');
const protectRoute = require('../middlewares/protectRoute');

// فقط ادمین‌ها دسترسی داشته باشند
router.get('/category-stats', protectRoute, getCategoryStats);

module.exports = router;
