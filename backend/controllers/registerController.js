const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password,email } = req.body;

  // بررسی اعتبار ورودی‌ها
  if (!username || !password|| !email  ) {
    return res
      .status(400)
      .json({ message: "نام کاربری،ایمیل و رمز عبور نمی‌تواند خالی بماند" });
  }


  // بررسی تکراری نبودن نام کاربری
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "نام کاربری تکراری است" });
  }
//برسی تکراری بودن ایمیل

  const duplicateEmail = await User.findOne({ email }).exec();
if (duplicateEmail) {
  return res.status(409).json({ message: "این ایمیل قبلاً ثبت شده است" });
}

  try {
    // ایجاد کاربر جدید (password هش می‌شود در middleware مدل)
    const newUser = new User({
      username,
      password,
      email,
      roles: { User: 1000 }, // ← یا همون ["user"]
    });

    await newUser.save(); // ← همین‌جا password هش می‌شود

    // تولید access token
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: newUser.username,
          userId: newUser._id,
          roles: newUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    // تولید refresh token
    const refreshToken = jwt.sign(
      { username: newUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    // اضافه‌کردن refresh token و ذخیره مجدد
    newUser.refreshToken = [refreshToken];
    await newUser.save();

    // ست‌کردن کوکی
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false, // در حالت production مقدار true بگذار
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 روز
    });

    // پاسخ نهایی
    return res.status(201).json({
      message: `حساب کاربری ${username} با موفقیت ایجاد شد`,
      accessToken,
      userInfo: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,

        roles: newUser.roles,
      },
      
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { register };



// const User   = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt    = require("jsonwebtoken");

// const register = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "نام کاربری و رمز عبور نمی‌تواند خالی بماند" });
//   }

//   const duplicate = await User.findOne({ username }).exec();
//   if (duplicate) {
//     return res.status(409).json({ message: "نام کاربری تکراری است" });
//   }

//   try {
//     //const hashedPwd = await bcrypt.hash(password, 10);
//     const newUser   = await User.create({
//       username,
//       password,
//       roles: ["user"],
//       refreshToken: [],
//     });

//     const accessToken = jwt.sign(
//       {
//         userInfo: {
//           username: newUser.username,
//           userId : newUser._id,
//           roles  : newUser.roles,
//         },
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "3d" }
//     );

//     // ساخت و ذخیرهٔ refresh token
//     const refreshToken = jwt.sign(
//       { username: newUser.username },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: "3d" }
//     );
//     newUser.refreshToken = [refreshToken];
//     await newUser.save();

//     // ست‌کردن کوکی (در توسعه secure می‌تواند false باشد)
//     res.cookie("jwt", refreshToken, {
//       httpOnly : true,
//       secure   : false,      // در prod → true
//       sameSite : "None",
//       maxAge   : 1000 * 60 * 60 * 24 * 3,
//     });

//     // ✅ فقط یک پاسخ برگردان
//     return res.status(201).json({
//       message: `حساب کاربری ${username} با موفقیت ایجاد شد`,
//       accessToken,
//       user: {
//         _id     : newUser._id,
//         username : newUser.username,
//         roles    : newUser.roles,
//       },
//     });
//   } catch (err) {
//     console.error("Register error:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { register };
