
// <Route path="/admin" element={
//   user?.roles?.Admin === 2000 ? <AdminPanel /> : <Navigate to="/unauthorized" />
// } />



const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "نام کاربری و پسورد نمی‌تواند خالی باشد" });
  }

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "کاربری با این نام وجود ندارد" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(401).json({ message: "رمز عبور درست نیست" });
  }


const isAdmin =
  foundUser.username === "نبی" &&
  (await bcrypt.compare(password, foundUser.password)) &&
  foundUser.roles?.Admin === 1001;

  
  const roles = Object.values(foundUser.roles).filter(Boolean);
  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
        userId: foundUser._id,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3d" }
  );

  const newRefreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );

  let newRefreshTokenArray = Array.isArray(foundUser.refreshToken)
    ? foundUser.refreshToken
    : [];

  if (cookies?.jwt) {
    const refreshToken = cookies.jwt;

    // اصلاح مهم: استفاده از $in برای آرایه
    const foundToken = await User.findOne({ refreshToken: { $in: [refreshToken] } }).exec();
    if (!foundToken) {
      newRefreshTokenArray = [];
    } else {
      newRefreshTokenArray = newRefreshTokenArray.filter((rt) => rt !== refreshToken);
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  }

  foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  await foundUser.save();

  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 1000 * 60 * 60 * 24 * 3,
  });

  res.json({
    userInfo: {
      username: foundUser.username,
      roles: foundUser.roles,
      _id: foundUser._id,
      photo: foundUser.photo || null,
      email:foundUser.email,
      isAdmin,
    },
    accessToken,
  });
};

module.exports = { handleLogin };
