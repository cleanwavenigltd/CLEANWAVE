const knex = require("../db/knex");


const getAllAgents = async () => {
  try {
    const agents = await knex("Users")
      .where({ role: "agent" })
      .leftJoin("Wallet", "Wallet.user_id", "Users.id")
      .select(
        "Users.id",
        "Users.name",
        "Users.email",
        "Users.gender",
        "Users.phone",
        "Users.location",
        "Users.age",
        "Users.is_verified",
        "Users.capacity",
        "Users.created_at",
        "Users.updated_at",
        "Wallet.balance"
      );
    return { success: true, agents };
  } catch (err) {
    console.log("agant.model::Error", err);
    return { success: false, message: "Server Error" };
  }
};

const registerAgent = async ({
  aggregatorId,
  name,
  email,
  phone,
  password,
  age,
  gender,
}) => {
  try {
    const existingAgent = await knex("Users").where({ email }).first();

    if (existingAgent) {
      return { success: false, error: "Agent already exist!" };
    }
    if (!aggregatorId) {
      return { success: false, error: "Unauthorized: No user found" };
    }
    const phoneNumber = await knex("Users").where({ phone }).first();

    if (phoneNumber) {
      return { success: false, error: "Phone number already registered" };
    }
    const aggregator = await knex("Users")
      .where({ id: aggregatorId, role: "aggregator" })
      .first();
    if (aggregator) {
      const location = aggregator.location;
      console.log("agent.model:: Aggregator found: ", aggregator);

      const [wasteBank] = await knex("Users")
        .insert({
          created_by: aggregatorId,
          name,
          email,
          phone,
          password,
          age,
          gender,
          role: "agent",
          is_verified: false,
          location,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        })
        .returning("*");
      const existingWallet = await knex("Wallet")
        .where({
          user_id: wasteBank.id,
        })
        .first();

      if (existingWallet) {
      } else {
        await knex("Wallet").insert({
          user_id: wasteBank.id,
          balance: 0,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        });
      }
      return { success: true, message: "Agent registered successfully" };
    } else {
      return { success: false, error: "Access denied" };
    }
  } catch (err) {
    console.log("agent.model::ERROR FOUND :", err);
    return { success: false, error: "Server Error" };
  }
};
const deleteAgent = async (aggregatorId) => {
  try {
    const agents = await knex("Users");
  } catch (err) {
    return { success: false, error: "Server Error" };
  }
};
// const Users = async () => {
//   try {
//     const allUsers = await knex("Users")
//       .leftJoin("Wallet", "Wallet.user_id", "Users.id")
//       .select(
//         "Users.id",
//         "Users.name",
//         "Users.email",
//         "Users.gender",
//         "Users.phone",
//         "Users.location",
//         "Users.age",
//         "Users.created_at",
//         "Users.updated_at",
//         "Wallet.balance"
//       );
//     return { success: true, allUsers };
//   } catch (err) {
//     console.log("Error in waste.models :", err);
//     return { success: false, error: "Server Error" };
//   }
// };

module.exports = { registerAgent, getAllAgents, deleteAgent };
