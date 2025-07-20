const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Add = require("../models/addProducts");

router.get("/related/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;


const ads = await Add.find({ categoryId, isAccepted: true }).sort({ createdAt: -1 });

    res.json(ads);
  } catch (error) {
    console.error("خطا در دریافت آگهی‌های مرتبط:", error);
    res.status(500).json({ message: "خطا در دریافت آگهی‌های مرتبط" });
  }
});

module.exports = router;
