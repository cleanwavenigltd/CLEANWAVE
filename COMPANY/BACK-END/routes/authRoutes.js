// const express = require("express");
// const router = express.Router();
// const { createUser, loginUser,getProfile} = require("../controllers/authControllers");
// const { authenticate } = require("../controllers/authControllers");
// // const getProfile = require("../controllers/authControllers");
// const { verifyEmail } = require("../controllers/verificationController");

// router.post("/register", createUser);
// router.get("/verify-email", verifyEmail);
// router.post("/login", loginUser);
// router.get("/profile", authenticate, getProfile);
// router.get("/register" && "/login", (req, res) => {
//   res.json({ message: "YOU MAKE A GET REQUEST TO REGISTER" });
// });

// module.exports = router;

// routes/authRoutes.js
const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getProfile,
  authenticate,
  logout,
  checkLogin
} = require("../controllers/authControllers");

const { verifyEmail } = require("../controllers/verificationController");

router.post("/register", createUser);
router.get("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.get("/profile", authenticate, getProfile);
router.post("/logout", logout);
router.get("/check-login", checkLogin);

module.exports = router;
