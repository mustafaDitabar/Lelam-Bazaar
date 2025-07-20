// controllers/userController.js
const User = require("../models/User");

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // اگر خواستی فقط ادمین بتونه حذف کنه، اینجا چک کن:
    // if (req.user.role !== "admin") return res.status(403).json({ message: "دسترسی ندارید" });

    // حذف کاربر از دیتابیس
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: "کاربر یافت نشد" });

    res.status(200).json({ message: "کاربر با موفقیت حذف شد" });
  } catch (error) {
    res.status(500).json({ message: "خطا در حذف کاربر", error: error.message });
  }
};

module.exports = { deleteUser };
