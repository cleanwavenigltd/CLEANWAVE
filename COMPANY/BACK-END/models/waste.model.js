const knex = require("../db/knex");

const registerWasteBank = async ({
  aggregatorId,
  name,
  email,
  phone,
  password,
  gender,
}) => {
  try {
    const existinWasteBank = await knex("Users").where({ email }).first();

    if (existinWasteBank) {
      return { success: false, error: "Waste bank already exist!" };
    }
    if (!aggregatorId) {
      return { success: false, error: "Unauthorized: No user found" };
    }
    const phoneNumber = await knex("Users").where({ phone }).first();

    if (phoneNumber) {
      return { success: false, error: "Phone number already registered" };
    }

    const aggregator = await knex("Users").where({ id: aggregatorId }).first();
    if (aggregator) {
      console.log("waste.model:: Aggregator Found: ", aggregator.role);
      const location = aggregator.location;

      const [wasteBank] = await knex("Users")
        .insert({
          created_by: aggregatorId,
          name,
          email,
          phone,
          password,
          gender,
          role: "waste",
          location,
          capacity: 0,
          is_verified: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        })
        .returning("*");
      await knex("Wallet").insert({
        user_id: wasteBank.id,
        balance: 0,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      });
      return { success: true, message: "Waste Bank registered successfully" };
    } else {
      return { succes: false, error: "Access denied" };
    }
  } catch (err) {
    console.log("ERROR FOUND :", err);
    return { success: false, error: "Server Error" };
  }
};

const getWasteBanksModel = async (aggregatorId) => {
  try {
    const wasteBanks = await knex("Users")
      .where({ created_by: aggregatorId, role: "waste" })
      .count("* as count")
      .first();
    return { success: true, wasteBanks };
  } catch (err) {
    console.log("waste.model:: ERROR:", err);
    return { success: false, error: "Server Error" };
  }
};

const getAllWasteBanks = async () => {
  try {
    const allWasteBanks = await knex("Users")
      .where({ role: "waste" })
      .leftJoin("Wallet", "Wallet.user_id", "Users.id")
      .select(
        "Users.id",
        "Users.name",
        "Users.email",
        "Users.gender",
        "Users.phone",
        "Users.is_verified",
        "Users.location",
        "Users.capacity",
        "Users.created_at",
        "Users.updated_at",
        "Wallet.balance"
      );
    return { success: true, allWasteBanks };
  } catch (err) {
    console.log("Error in waste.models :", err);
    return { success: false, error: "Server Error" };
  }
};

module.exports = { registerWasteBank, getWasteBanksModel, getAllWasteBanks };
