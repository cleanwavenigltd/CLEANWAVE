const knex = require("../db/knex");
const bcrybt = require("bcryptjs");

const registerAggregator = async ({
  name,
  password,
  email,
  gender,
  phone,
  state,
  lga,
}) => {
  try {
    const existinAggregator = await knex("Users").where({ email }).first();
    if (existinAggregator) {
      return { success: false, error: "Aggregator already exist" };
    }
    const phoneNumber = await knex("Users").where({ phone }).first();

    if (phoneNumber) {
      return { success: false, error: "Phone number already registered" };
    }
    // const hashedPassword = await bcrybt.hash(password, 10);
    // console.log("This is the hashed ppassword: ",hashedPassword)
    const [aggregator] = await knex("Users")
      .insert({
        name,
        email,
        password,
        gender,
        role: "aggregator",
        phone,
        state,
        lga,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning("*");
    const existingWallet = await knex("Wallet")
      .where({
        user_id: aggregator.id,
      })
      .first();

    if (existingWallet) {
    } else {
      await knex("Wallet").insert({
        user_id: aggregator.id,
        balance: 0,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      });
    }
    return { success: true, message: "Aggregator registered successfull" };
  } catch (err) {
    console.log("ERROR FOUND :", err);
    return { success: false, error: "Server Error" };
  }
};
const getAggregators = async () => {
  try {
    const aggregators = await knex("Users")
      .where({ role: "aggregator" })
      .leftJoin("Wallet", "Wallet.user_id", "Users.id")
      .select(
        "Users.id",
        "Users.name",
        "Users.email",
        "Users.gender",
        "Users.is_verified",
        "Users.phone",
        "Users.state",
        "Users.lga",
        "Users.role",
        "Users.created_at",
        "Users.updated_at",
        "Wallet.balance"
      );

    return { success: true, aggregators };
  } catch (err) {
    console.log("ERROR:", err);
    return { success: false, error: "Server Error" };
  }
};

// const getAggregators = async () => {
//   try {
//     const aggregators = await knex("Users").select("*");
//     return { succes: true, aggregators };
//   } catch (err) {
//     return { success: false };
//   }
// };

module.exports = { registerAggregator, getAggregators };
