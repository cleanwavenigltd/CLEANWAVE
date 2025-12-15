const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/isAdmin");
const { isAggregator } = require("../utils/isAggregator");
const { authenticate } = require("../controllers/authControllers");
const {
  getAgentRequest,
  getAll,
  addAgent,
} = require("../controllers/agentsControllers");
router.post("/register", isAggregator, addAgent);
router.get("/get",isAggregator,getAgentRequest);
//router.get("/delete", isAdmin, getAgentRequest);
router.get("/get-all", isAdmin, getAll);

module.exports = router;
