const User =require('../models/User.js') 
const Ad =require ('../models/addProducts.js')

 const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAds = await Ad.countDocuments();

    res.status(200).json({
      totalUsers,
      totalAds,
    });
  } catch (error) {
    console.error('خطا در دریافت آمار داشبورد:', error);
    res.status(500).json({ message: 'خطا در دریافت آمار' });
  }
};
module.exports=getDashboardStats;