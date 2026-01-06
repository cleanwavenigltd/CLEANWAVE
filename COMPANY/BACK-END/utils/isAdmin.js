// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// exports.isAdmin = (req, res, next) => {
//   const header = req.headers.authorization;
//   // console.log("Header :",req)

//   if (!header) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = header.split(" ")[1];

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.log(err);
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }
//     // console.log(decoded,"DECODED");
//     req.user = decoded;
//     next();
//   });
// };
const jwt = require("jsonwebtoken");
// const isAggregator = (req, res, next) => {
//   try {
//     const { role } = req.user;
//     if (role !== "aggregator") {
//       return res.status(403).json({ error: "Access denied" });
//     }
//     next();
//   } catch (err) {
//     return res.status(500).json({ error: "Server Error" });
//   }
// };

exports.isAdmin = (req, res, next) => {
  // const header = req.headers.authorization;

  const authHeader = req.headers["authorization"];
  console.log("Admin Authenticate Middleware:: Auth Header:: ", authHeader);

  // Extract the token part from "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decoded = jwt.decode(token);
  console.log("isAdmin:: ", decoded);
  if (decoded.role !== "admin") {
    return res.status(403).json({ message: "Unuthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });

    req.user = decoded;
    next();
  });
};

// module.exports = { isAggregator };
