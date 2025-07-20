const path = require("path");
const fs = require("fs");

const URL_PREFIX = "http://localhost:3500/"; // آدرس پایه سرور خودت

// تابع دریافت مسیر کامل فایل با تطبیق ورودی (نسبی یا URL کامل)
const getImageFullPath = (relativeOrFullUrl) => {
  let relativePath = relativeOrFullUrl;
  if (relativeOrFullUrl.startsWith(URL_PREFIX)) {
    relativePath = relativeOrFullUrl.substring(URL_PREFIX.length);
  }
  return path.join(process.cwd(), "uploads", relativePath);
};

// حذف فایل در صورت وجود
const deleteFileIfExists = (fullPath) => {
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(fullPath, (err) => {
        if (err) console.error("❌ خطا در حذف فایل عکس:", err);
        else console.log("🗑️ فایل حذف شد:", fullPath);
      });
    } else {
      console.warn("⚠️ فایل برای حذف وجود ندارد:", fullPath);
    }
  });
};

module.exports = {
  getImageFullPath,
  deleteFileIfExists,
  URL_PREFIX,
};
