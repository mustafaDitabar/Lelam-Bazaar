const express = require('express');
const router = express.Router();
const { approveAd, deleteAd } = require('../controllers/Adds.Admin-Conrtoller');
const protectRoute = require('../middlewares/protectRoute');

// تأیید آگهی
router.put('/approve/:id', protectRoute, approveAd);

// حذف آگهی
router.delete('/:id', protectRoute, deleteAd);

module.exports = router;
