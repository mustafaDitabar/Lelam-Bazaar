const Category =require('../models/Category.js') 
const  fs =require ('fs')
const path =require('path') 

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'دسته‌بندی یافت نشد' });

    // حذف عکس از سیستم فایل
    const imageName = category.imagesURLs?.[0]?.split('/').pop();
    if (imageName) {
      const imagePath = path.join('public', 'images', imageName);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn('خطا در حذف عکس:', err.message);
      });
    }

    // حذف از دیتابیس
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'دسته‌بندی با موفقیت حذف شد' });
  } catch (err) {
    console.error('خطا در حذف دسته‌بندی:', err);
    res.status(500).json({ message: 'خطا در حذف دسته‌بندی' });
  }
};
module.exports=deleteCategory
