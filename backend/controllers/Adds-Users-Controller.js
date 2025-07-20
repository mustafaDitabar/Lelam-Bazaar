const Ad =require ("../models/addProducts")

// گرفتن آگهی‌های مربوط به یک کاربر خاص
const getUserAdds = async (req, res) => {
  try {
    const { userId } = req.params;

    // پیدا کردن تمام آگهی‌های مربوط به این کاربر
    const ads = await Ad.find({creatorId: userId });

    res.status(200).json(ads);
  } catch (error) {
    console.error("خطا در گرفتن آگهی‌های کاربر:", error);
    res.status(500).json({ message: "خطا در گرفتن آگهی‌های کاربر" });
  }
};
module.exports=getUserAdds;