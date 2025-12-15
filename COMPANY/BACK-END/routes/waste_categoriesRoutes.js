const express = require("express");
const router = express();
const {
  getWasteCategories,
  addWasteCategory,
} = require("../controllers/waste_categoriesControllers");
const { isAdmin } = require("../utils/isAdmin");
const { authenticate } = require("../controllers/authControllers");

router.get("/categories", authenticate, getWasteCategories);
router.post("/categories", isAdmin, addWasteCategory);
module.exports = router;
