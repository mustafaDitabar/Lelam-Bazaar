const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protectRoute = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }




    const accessToken = authHeader.split(" ")[1];

    // بررسی access token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded?.userInfo?.userId) {
      return res.status(403).json({ error: "Forbidden - Invalid token structure" });
    }
    // پیدا کردن کاربر از دیتابیس با userId
    const user = await User.findById(decoded.userInfo.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ذخیره کاربر داخل req برای استفاده در روترهای بعدی
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "jwt expired" });
    }
    res.status(403).json({ error: "Forbidden - Invalid or expired token" });
}

};

module.exports = protectRoute;
