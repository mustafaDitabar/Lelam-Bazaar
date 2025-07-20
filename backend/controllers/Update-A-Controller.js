const Category =require('../models/Category') 
const fs =require('fs') 
const path = require ('path')
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const file = req.file;

  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'دسته‌بندی یافت نشد' });

    // اگر عنوان جدید داده شده، بروزرسانی شود
    if (title) category.title = title;

    // اگر عکس جدید داده شده
    if (file) {
      const oldImageName = category.imagesURLs?.[0]?.split('/').pop();

      // حذف عکس قبلی از سرور
      if (oldImageName) {
        const imagePath = path.join('public', 'images', oldImageName);
        fs.unlink(imagePath, (err) => {
          if (err) console.warn('خطا در حذف فایل قبلی:', err.message);
        });
      }

      // ذخیره عکس جدید
      const newImageURL = `/images/${file.filename}`;
      category.imagesURLs = [newImageURL];
    }

    const updated = await category.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error('خطا در بروزرسانی دسته:', err);
    res.status(500).json({ message: 'خطا در بروزرسانی دسته‌بندی' });
  }
};
module.exports=updateCategory;