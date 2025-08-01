const  jwt =require("jsonwebtoken")

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign(
  { userInfo: { userId } },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: "15d" }
);

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
};

module.exports = generateTokenAndSetCookie;
