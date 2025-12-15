const knex = require("../db/knex");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    console.log("this is the token in verificatonControllers: ", token);

    if (!token) {
      return res.status(400).json({ error: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);

    const user = await knex("Users").where({ email: decoded.email }).first();

    if (!user) {
      return res.status(404).json({ error: "Invalid token" });
    }

    await knex("Users").where({ email: decoded.email }).update({
      is_verified: true,
      verification_token: null,
      updated_at: knex.fn.now(),
    });

    const existWallet = await knex("Wallet")
      .where({ user_id: user.id })
      .first();
    if (existWallet) {
    } else {
      // Create wallet on verification
      await knex("Wallet").insert({
        user_id: user.id,
        balance: 0.0,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      });
    }

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("Error in verificationControllers :", error);
    return res.status(400).json({ error: "Invalid or expired token" });
  }
};
