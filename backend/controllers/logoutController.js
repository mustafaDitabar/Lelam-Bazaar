const User = require("../models/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
      return res.sendStatus(204);
    }

    // Remove refresh token
    foundUser.refreshToken = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken
    );
    await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  } catch (err) {
    console.error("Error during logout:", err);
    return res.status(500).json({ error: "خطا در خروج از حساب" });
  }
};

module.exports = { handleLogout };
