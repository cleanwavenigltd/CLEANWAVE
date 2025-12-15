const knex = require("../db/knex");

const getWalletBalance = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log("User ID:", userId);
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // const wallet = await knex("Wallet").where({ user_id: userId }).first();
    const wallet = await knex("Wallet").where({ id: userId }).first();

    console.log("walletControllers ::", wallet);

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.status(200).json({ success: true, balance: wallet.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getWalletBalance,
};
