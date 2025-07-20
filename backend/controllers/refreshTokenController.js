// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// const handleRefreshToken = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(401);

//   const refreshToken = cookies.jwt;
//   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

//   const foundUser = await User.findOne({ refreshToken }).exec();

//   if (!foundUser) {
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
//       if (err) return;
//       const hackedUser = await User.findOne({ username: decoded.username }).exec();
//       if (hackedUser) {
//         hackedUser.refreshToken = [];
//         await hackedUser.save();
//       }
//     });
//     return res.sendStatus(403);
//   }

//   const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
//     if (err) {
//       foundUser.refreshToken = [...newRefreshTokenArray];
//       await foundUser.save();
//       return res.sendStatus(403);
//     }

//     if (foundUser.username !== decoded.username) return res.sendStatus(403);

//     const roles = Object.values(foundUser.roles);
//     const accessToken = jwt.sign(
//       {
//         userInfo: {
//           username: decoded.username,
//           userId: foundUser._id, // اختیاری اما مفید
//           roles,
//         },
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "10s" }
//     );

//     const newRefreshToken = jwt.sign(
//       { username: foundUser.username },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: "1d" }
//     );

//     foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//     await foundUser.save();

//     res.cookie("jwt", newRefreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.json({ roles, accessToken });
//   });
// };


// module.exports = { handleRefreshToken };

const User = require("../models/User");
const jwt = require("jsonwebtoken");



const handleRefreshToken = async (req, res) => {
  console.log("🍪 Cookies:", req.cookies);
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  // توکن در دیتابیس پیدا نشد: احتمالاً هک شده
  if (!foundUser) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403);
      const hackedUser = await User.findOne({ username: decoded.username }).exec();
      if (hackedUser) {
        hackedUser.refreshToken = [];
        await hackedUser.save();
      }
    });
    return res.sendStatus(403);
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err || foundUser.username !== decoded?.username) {
      foundUser.refreshToken = [...newRefreshTokenArray];
      await foundUser.save();
      return res.sendStatus(403);
    }

    // ساخت توکن جدید
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decoded.username,
          userId: foundUser._id,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2d" }
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "5d" }
    );

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: false,
      // process.env.NODE_ENV === "production", // روی لوکال false بذار
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ roles, accessToken });
  });
};


module.exports = { handleRefreshToken };