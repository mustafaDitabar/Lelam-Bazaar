const jwt = require("jsonwebtoken");

const generateTokenOnly = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = generateTokenOnly;
