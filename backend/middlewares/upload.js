const multer = require("multer");
const path = require("path");
const fs = require("fs");

// مسیر پوشه ذخیره فایل
// const uploadPath = path.join(__dirname, '../uploads/images');
const uploadPath = path.join(__dirname, '../uploads/images');


// اطمینان از وجود پوشه
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// تعریف ذخیره‌سازی فایل‌ها
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  }
});

// فیلتر فایل برای بررسی MIME type و پسوند
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype.toLowerCase());

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("فقط فایل‌های تصویری با فرمت jpg، jpeg یا png مجاز هستند"), false);
  }
};

// تنظیمات multer نهایی
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 } // حداکثر 10 مگابایت
});

module.exports = upload;


//کد قبلی
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // مطمئن شو پوشه uploads وجود دارد
// const uploadPath = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, filename);
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
//   fileFilter: (req, file, cb) => {
//     const validTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (validTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("فقط فایل تصویری مجاز است"), false);
//     }
//   },
// });

// module.exports = upload;
