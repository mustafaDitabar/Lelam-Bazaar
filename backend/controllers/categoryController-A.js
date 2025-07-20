// controllers/categoryController.js
const Category = require( '../models/Category')

const createCategory = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({ message: 'عنوان و عکس الزامی است' });
    }

    const imageURL = `/images/${req.file.filename}`;

    const category = new Category({
      title,
      imagesURLs: [imageURL],
    });

    await category.save();
    res.status(201).json({ message: 'دسته‌بندی ذخیره شد', category });
  } catch (err) {
    console.error('خطا در ایجاد دسته‌بندی:', err);
    res.status(500).json({ message: 'خطای سرور' });
  }
};

module.exports = createCategory;
