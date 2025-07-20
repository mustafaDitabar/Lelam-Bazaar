
const express = require("express")
const multer = require("multer")
const path = require("path")
const { createCategory, getAllCategories } =require("../controllers/categoryController.js")

const router = express.Router();

// تنظیمات ذخیره فایل در public/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ارسال دسته‌بندی جدید با آیکن
router.post('/', upload.single('icon'), createCategory);
// router.post('/add', addCategory);
router.get('/categories', getAllCategories);

module.exports=router
