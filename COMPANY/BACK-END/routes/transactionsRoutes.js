const express = require("express");
const router = express();
const { isAdmin } = require("../utils/isAdmin");
const { authenticate } = require("../controllers/authControllers");
const {
  addTransaction,
  getTransactions,
  verifyAccount,
  transferFunds
} = require("../controllers/transactionsControllers");
router.post("/add", addTransaction);

router.post("/add", authenticate, addTransaction);
router.get("/get", authenticate, getTransactions);
router.post("/verify-account", authenticate, verifyAccount);
router.post("/transfer"),authenticate, transferFunds;

module.exports = router;
