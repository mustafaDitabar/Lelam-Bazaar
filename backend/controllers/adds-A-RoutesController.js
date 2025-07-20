const Add = require("../models/addProducts")

const getAllAdds = async (req, res) => {
  try {
    const adds = await Add.find({ isAccepted:false }).sort({ createdAt: -1 }).populate('categoryId'); // جدیدترین‌ها اول

    res.status(200).json(adds);
  } catch (error) {
res.status(500).json({ message: 'خطا در گرفتن آگهی‌ها', error: error.message });
  }
};

module.exports={getAllAdds};