const {createTransaction, fetchTransactions} = require("../models/transactions.model");
const addTransaction = async (req, res) => {
  try {
    const { userId } = req.user;
    const { amount, type, description } = req.body;
    if (!amount || !type || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const transaction = await createTransaction({
      userId,
      amount,
      type,
      description,
    });
    if (transaction.success) {
      return res.status(200).json(transaction);
    } else {
      return res.status(400).json({ error: transaction.error });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { userId } = req.user;
    const transactions = await fetchTransactions(userId);
    if (transactions.success) {
      return res.status(200).json({ transactions });
    } else {
      return res.status(400).json({ error: "No Transactions Found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { addTransaction, getTransactions };   