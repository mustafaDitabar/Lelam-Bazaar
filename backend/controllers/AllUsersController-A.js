const Add = require("../models/User")

const AllUsrs = async (req, res) => {
  try {
    const users = await Add.find().sort({ createdAt: -1 }); // جدیدترین‌ها اول
console.log(users);
    res.status(200).json(users);
  } catch (error) {
res.status(500).json({ message: 'خطا در گرفتن آگهی‌ها', error: error.message });
  }
};

module.exports={AllUsrs};