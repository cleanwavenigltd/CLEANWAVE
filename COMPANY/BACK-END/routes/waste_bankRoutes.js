const express = require("express");
const router = express();
const { isAggregator } = require("../utils/isAggregator");
const { isAdmin } = require("../utils/isAdmin");
const {authenticate} =  require("../controllers/authControllers")
const {
  addWasteBank,
  getWasteBanks,
  getAll,
  getConnWasteBank
} = require("../controllers/waste_bankControllers");
// const {authenticate} = require("../controllers/authControllers")
router.post("/register", isAggregator, addWasteBank);
router.get("/get", isAggregator, getWasteBanks);
router.get("/conn-waste-bank",authenticate,getConnWasteBank)
router.get("/get-all", isAdmin, getAll);

module.exports = router;
    