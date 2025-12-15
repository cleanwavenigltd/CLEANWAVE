const express = require("express");
const router = express();
const { authenticate } = require("../controllers/authControllers");
const { getWalletBalance } = require("../controllers/walletControllers");

router.get("/balance", authenticate, getWalletBalance);

module.exports = router;
