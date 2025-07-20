// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const verifyJWT = require("../../middleware/verifyJWT");
// const User = require("../../models/User");

// // ✅ بررسی توکن و واکشی اطلاعات کامل کاربر
// router.get("/login/success", verifyJWT, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("username photo email role");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ user });
//   } catch (err) {
//     console.error("❌ خطا در دریافت کاربر:", err);
//     res.sendStatus(500);
//   }
// });

// // ❌ ورود ناموفق
// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     error: true,
//     message: "Login failed",
//   });
// });

// // ✅ احراز هویت موفق گوگل و صدور توکن
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/auth/login/failed" }),
//   (req, res) => {
//     const user = req.user;

//     const token = jwt.sign(
//       {
//         userInfo: {
//           userId: user._id,
//           username: user.username,
//           roles: [user.role],
//         },
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "15m" }
//     );

//     // redirect با توکن
//     res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
//   }
// );

// // ✅ شروع احراز هویت گوگل
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     prompt: "select_account",
//   })
// );

// // ✅ خروج از سیستم
// router.get("/logout", (req, res, next) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect(process.env.CLIENT_URL);
//   });
// });

// module.exports = router;




const router = require("express").Router();
const passport = require("passport");

router.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"SuccessFully Logined",
            user: req.user
        })


    }else{
res.status(403).json({error:true,message:"NotAuthrized"});
    }
});

router.get("/login/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        message:"Login failed",

    });
});

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth/login/failed",
  }));
  

router.get("/google",
    passport.authenticate("google",{
    scope: ['profile', 'email', 'openid']

    })
);

router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect(process.env.CLIENT_URL);
    });
});
module.exports =router;
