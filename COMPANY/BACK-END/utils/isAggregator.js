// const jwt = require("jsonwebtoken");

// exports.isAggregator = (req, res, next) => {
//   const header = req.headers.authorization;

//   if (!header) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = header.split(" ")[1];
//   const decoded = jwt.decode(token);
//   console.log("isaggregator:: ", decoded);
//   if (decoded.role !== "aggregator") {
//     return res.status(401).json({ message: "Unuthorized" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err)
//       return res.status(403).json({ message: "Invalid or expired token" });

//     req.user = decoded;
//     next();
//   });
// };
const jwt = require("jsonwebtoken");

exports.isAggregator = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "aggregator")
      return res.status(403).json({ error: "Unuthorized" });

    req.user = decoded;

    req.userId = decoded.id;
    // req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
