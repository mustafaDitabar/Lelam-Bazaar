const Category=require("../../backend/models/Category")
// افزودن دسته‌بندی جدید
const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const iconFile = req.file;

    // بررسی فیلدهای ضروری
    if (!title || !iconFile) {
      return res.status(400).json({ error: "لطفاً عنوان و آیکن دسته‌بندی را ارسال کنید." });
    }

    // بررسی وجود دسته‌بندی با همین عنوان (قبل از ساختن دسته‌بندی)
    const existing = await Category.findOne({ title: title.trim() });
    if (existing) {
      return res.status(400).json({ error: "این دسته‌بندی قبلاً موجود است." });
    }

    // مسیر ذخیره آیکن - اگر نیاز به مسیر کامل دارید، این قسمت قابل تغییر است
    const iconPath = `/public/images/${iconFile.filename}`;

    // ساخت دسته‌بندی جدید
    const newCategory = new Category({
      title: title.trim(),
      imagesURLs: [iconPath]
    });

    // ذخیره در دیتابیس
    await newCategory.save();

    // ارسال پاسخ موفقیت
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("❌ خطا در ایجاد دسته‌بندی:", error.message);
    res.status(500).json({ error: "خطا در ایجاد دسته‌بندی" });
  }
};

// گرفتن همه دسته‌بندی‌ها
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error("❌ خطا در دریافت دسته‌بندی‌ها:", err.message);
    res.status(500).json({ message: "خطا در دریافت دسته‌بندی‌ها", error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories
};