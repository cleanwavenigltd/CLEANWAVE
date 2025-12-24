const knex = require("../db/knex");

exports.updateBalance = async (id, amount, trx) => {
  try {
    trx = trx || knex;
    if (!amount || isNaN(amount)) {
      throw new Error("Invalid amount");
    }
    if (id) {
      await trx("Wallet")
        .where({ user_id: id })
        .increment("balance", amount) // Adds 'amount' to the current balance
        .update({ updated_at: knex.fn.now() }); // You can still update other fields

      return { success: true };
    }
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

