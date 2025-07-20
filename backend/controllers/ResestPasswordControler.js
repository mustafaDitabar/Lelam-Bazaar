const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const handleResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    try {
      // بررسی اعتبار توکن
      const decoded = jwt.verify(token, process.env.SECRET_KEY_PWD);
      console.log("✅ Token OK:", decoded);
  
      // هش کردن پسورد جدید
      const hash = await bcrypt.hash(password, 10);
  
      // آپدیت رمز عبور کاربر
      await User.findByIdAndUpdate(id, { password: hash });
  
      res.send({ Status: "Success" });
  
    } catch (error) {
      console.error("❌ Error during password reset:", error.name, error.message);
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ Status: "Error", message: "Token has expired" });
      }
  
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ Status: "Error", message: "Invalid token" });
      }
  
      res.status(500).json({ Status: "Error", message: "Server error" });
    }
  };
  
  module.exports = {handleResetPassword};