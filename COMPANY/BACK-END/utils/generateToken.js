const jwt = require("jsonwebtoken");
require("dotenv").config()
const generateEmailToken = (email) => {
  return jwt.sign({ email }, process.env.VERIFY_SECRET, {
    expiresIn: "1d",
  });
};
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
module.exports = { generateToken, generateEmailToken };
