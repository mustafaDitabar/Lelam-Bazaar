const Ad = require('../models/addProducts');
const Category = require('../models/Category');

const getCategoryStats = async (req, res) => {
  try {
    const totalAds = await Ad.countDocuments();
    const stats = await Ad.aggregate([
      {
        $group: {
          _id: '$categoryId', // ✅ درست شد

            count: { $sum: 1 }
        }
      }
    ]);

    const categories = await Category.find();

    const result = stats.map(stat => {
      const category = categories.find(cat => cat._id.toString() === stat._id.toString());
      const percentage = ((stat.count / totalAds) * 100).toFixed(2);
      return {
        category: category ? category.title : 'نامشخص',
        count: stat.count,
        percentage: Number(percentage),
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در دریافت آمار دسته‌بندی‌ها' });
  }
};

module.exports = { getCategoryStats };
