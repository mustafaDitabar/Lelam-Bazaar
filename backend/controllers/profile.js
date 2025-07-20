
const generateTokenOnly = require("../utils/generateTokenOnly");
const User = require("../models/User");
const generateTokenAndSetCookie = require("../utils/generateToken");
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.file) {
      user.photo = `/uploads/${req.file.filename}`;
    }

    if (req.body.password && req.body.password.trim() !== "") {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    generateTokenAndSetCookie(updatedUser._id, res);

res.json({
  userInfo: {
     _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      photo: updatedUser.photo || null,
  },
  token: generateTokenOnly(updatedUser._id),
});


    // res.status(200).json({
    //   _id: updatedUser._id,
    //   username: updatedUser.username,
    //   email: updatedUser.email,
    //   photo: updatedUser.photo || null,
    //   token: generateTokenOnly(updatedUser._id),
    // });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
 module.exports = updateProfile;
// const updateProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     // اگر مدل فیلدش username هست، این خط را تغییر بده
//     user.username = req.body.username || user.username;
//     user.email = req.body.email || user.email;

//   if (req.file) {
//   user.photo = {
//     data: req.file.buffer,
//     contentType: req.file.mimetype,
//   };
// }

//     if (req.body.password && req.body.password.trim() !== "") {
//       user.password = req.body.password; // هش می‌شود اگر pre-save فعال باشد
//     }
//     const authHeader = req.headers['authorization'];

//     const updatedUser = await user.save();

//     generateTokenAndSetCookie(updatedUser._id, res);

//     res.status(200).json({
//   _id: updatedUser._id,
//   username: updatedUser.username,
//   email: updatedUser.email,
//   photo: updatedUser.photo
//     ? `data:${updatedUser.photo.contentType};base64,${updatedUser.photo.data.toString("base64")}`
//     : null,
//   token: generateTokenOnly(updatedUser._id),
// });
   
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


