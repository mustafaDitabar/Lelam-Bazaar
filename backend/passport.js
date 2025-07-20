const jwt = require('jsonwebtoken')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
 const User = require("../backend/models/User");  // مسیر درست بده

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3500/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, displayName, emails, photos } = profile;

        let user = await User.findOne({ googleId: id });

        if (!user) {
          user = await User.create({
            googleId: id,
            username: displayName,
            email: emails[0].value,
            photo: photos[0].value, // ⬅ عکس پروفایل
            role: "user",
          });
        }


        const accessToken = jwt.sign(
          {
            userInfo: {
              userId: user._id,
              username: user.username,
              roles: [user.role],
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        
        // می‌تونی توکن رو به صورت کوکی ست کنی یا در redirect به کلاینت بفرستی
        return done(null, { ...user.toObject(), accessToken });

      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;



// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");
// const User = require("../backend/models/User");  // مسیر درست بده

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:3500/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const googleProfile = profile._json;
//       try {
//         let user = await User.findOne({ googleId: googleProfile.sub });

//         if (!user) {
//           user = await User.create({
//             googleId: googleProfile.sub,
//             name: googleProfile.name,
//             email: googleProfile.email,
//             photo: googleProfile.picture,
//             role: "user",
//           });
//         }

//         return done(null, user);  // 👉 ارسال کل یوزر
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// // session
// passport.serializeUser((user, done) => {
//   done(null, user._id);  // ذخیره فقط آیدی MongoDB
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// module.exports = passport;