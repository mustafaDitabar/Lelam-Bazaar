const User = require("../models/User");
const bcrypt = require("bcrypt");

const CurrentPasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "رمز عبور مورد نیاز است." });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "رمز عبور نادرست است." });
    }

    res.status(200).json({ message: "رمز عبور صحیح است." });
  } catch (error) {
    console.error("خطا در بررسی رمز:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داد." });
  }
}

module.exports = CurrentPasswordController;
