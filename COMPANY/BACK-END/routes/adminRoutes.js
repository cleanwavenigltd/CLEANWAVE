const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/isAdmin");
const {
  getAllInfo,
  totalUsers,
  adminLogin,
  updateProfile,
  adminLogout,
  adminCheckLogin,
} = require("../controllers/adminControllers");

router.post("/login", adminLogin);
router.post("/logout", isAdmin, adminLogout);
router.get("/check-login", adminCheckLogin);
router.get("/all-info", isAdmin, getAllInfo);
router.get("/total-users", isAdmin, totalUsers);
router.put("/update-profile", isAdmin, updateProfile);
module.exports = router;
