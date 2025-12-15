const express = require("express");
const router = express();
const { authenticate } = require("../controllers/authControllers");
const {
  addAggregator,
  getAggregatorRequest,
} = require("../controllers/aggregatorsControllers");
const { isAdmin } = require("../utils/isAdmin");

router.post("/register", isAdmin, addAggregator);
router.get("/get", isAdmin, getAggregatorRequest);
module.exports = router;
