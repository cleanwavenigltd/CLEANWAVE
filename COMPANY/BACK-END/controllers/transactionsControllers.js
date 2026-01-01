const {
  createTransaction,
  fetchTransactions,
} = require("../models/transactions.model");
const { deductBalance } = require("../models/users.model");
const knex = require("../db/knex");
const axios = require("axios");
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

const verifyAccount = async (req, res) => {
  try {
    const { accountNumber, bankCode } = req.body;

    const response = await axios.get(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.status) {
      return res.status(200).json({
        success: true,
        accountName: response.data.data.account_name,
      });
    } else {
      return res
        .status(400)
        .json({ error: "Account verification failed" });
    }
  } catch (err) {
    console.error("Paystack Verification Error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Verification service currently unavailable" });
  }
}

exports.transfer = async (req, res) => {
  try {
    const { userId } = req.user;
    const { amount } = req.body;

    // Use your specific test data for debugging:
    const accountNumber = "0001234567";
    const bankCode = "058"; // GTB bank code
    const accountName = "TEST ACCOUNT 1234567890";

    // 1. Fetch User & Check Balance
    const user = await knex("Users").where({ id: userId }).first();
    if (!user || user.balance < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient balance or invalid user" });
    }

    // 2. Step One: Create Transfer Recipient
    const recipientResponse = await axios.post(
      "https://api.paystack.co/recipients",
      {
        type: "nuban",
        name: accountName,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: "NGN",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const recipientCode = recipientResponse.data.data.recipient_code;

    // 3. Step Two: Initiate Transfer
    const transferResponse = await axios.post(
      "api.paystack.co",
      {
        source: "balance",
        amount: amount * 100, // Convert to Kobo
        recipient: recipientCode,
        reason: "Waste Pickup Payout",
      },
      {        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (transferResponse.data.status) {
      // 4. Deduct Balance & Record Transaction
      await deductBalance({ id: userId, amount });
      await addTransaction({
        userId,
        amount,
        type: "debit",
        reference: transferResponse.data.data.reference,
      });

      return res.status(200).json({
        success: true,
        message: "Transfer initiated successfully",
        data: transferResponse.data.data,
      });
    }
  } catch (err) {
    // Log the specific Axios error for debugging
    console.error(
      "Paystack Transfer Error Detail:",
      err.response?.data || err.message
    );
    const errorMsg =
      err.response?.data?.message || "Transfer service currently unavailable";
    return res.status(500).json({ error: errorMsg });
  }
};

module.exports = { addTransaction, getTransactions, transferFunds: transfer };
