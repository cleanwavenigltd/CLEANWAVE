const express = require("express");
const router = express();
const { isAdmin } = require("../utils/isAdmin");
const { authenticate } = require("../controllers/authControllers");
const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionsControllers");
router.post("/add", addTransaction);

router.post("/add", authenticate, addTransaction);
router.get("/get", authenticate, getTransactions);

module.exports = router;
