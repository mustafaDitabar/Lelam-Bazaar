const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ Status: "User not exist" });
    }



    const token = jwt.sign(
        {
          userInfo: {
             username: foundUser.username,
             userId: foundUser._id,
             roles : foundUser.roles,
    
              },
        },
        process.env.SECRET_KEY_PWD,
        { expiresIn: "1d" }
      );
    // const token = jwt.sign(
    //   {
    //      id: user._id },
    //    process.env.SECRET_KEY_PWD, {
    //   expiresIn: "1d",
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "تغییر رمز عبور",
      text: `http://localhost:3000/reset-password/${user._id}/${token}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" ایمیل ارسال شد:", info.response); 
    res.status(200).send({ message: "ایمیل ارسال شد" });
    

  } catch (err) {
    console.log("خطا در ارسال ایمیل یا سرور:", err);
    return res.status(500).send({ Status: "Error", message: "خطا در سرور" });
  }
};

module.exports = { handleForgotPassword };
