// routes/adds.js
const express = require("express");
const router = express.Router();
const Ad = require("../models/addProducts");

router.post('/by-category', async (req, res) => {
  const { categoryId } = req.body; // ✅ در POST می‌توان از body استفاده کرد
console.log(categoryId,"category ????????????????????");
    try {
    const ads = await Ad.find({ categoryId, isAccepted: true }).sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    console.error('خطا در دریافت آگهی‌ها بر اساس دسته‌بندی:', error);
    res.status(500).json({ message: 'خطا در دریافت آگهی‌ها' });
  }
});
module.exports = router;

