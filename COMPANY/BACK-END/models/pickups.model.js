const knex = require("../db/knex");
const { createNotification } = require("./notifications.model");

const createPickup = async ({
  userId,
  agentId,
  category,
  subcategory,
  kg,
  address,
}) => {
  // const state = await knex("Users")
  // find any agent at this state
  // const locValue =
  //   typeof address === "object" && address !== null
  //     ? address.state || address.name || address.city
  //     : address;

  // console.log("state Value:", locValue);

  try {
    const agent = await knex("Users")
      .where({ id: agentId, role: "agent" })
      .first();
    console.log(agent || "no agent");

    if (!agent) {
      return {
        success: false,
        error: "No pickups available at this state",
      };
    }
  } catch (err) {
    console.log("Console Error: ", err);
    return "Server error";
  }

  const [pickup] = await knex("Pickups")
    .insert({
      user_id: userId,
      agent_id: agentId,
      kg,
      category,
      subcategory,
      address,
      status: "pending",
    })
    .returning("*");
  // await createNotification({
  //   userId: agentId,
  //   message: `New pickup request assigned to you. Pickup ID: ${pickup.id}, state: ${state.state}, Category: ${category}, Weight: ${kg}kg.`,
  // });

  //   await knex("Notifications").insert({
  //     user_id: agent.user_id,
  //     message: `New pickup request assigned to you. Pickup ID: ${pickup.id}, state: ${state.state}, Category: ${category}, Weight: ${kg}kg.`,
  //     is_read: false,
  //   });

  return { success: true, message: pickup };
};

const getPickupCount = async (userId) => {
  // const pickups = await knex("Pickups").where({ user_id: userId });
  // return pickups;
  const pickups = await knex("Pickups")
    .where({ user_id: userId })
    .orWhere("agent_id", userId)
    .count("* as count")
    .first();
  return parseInt(pickups?.count || 0, 10);
};
const createWastePickup = async ({ userId, category, kg, note }) => {
  try {
    const wasteBank = await knex("Users").where({ id: userId }).first();
    const state = wasteBank.state;
    console.log("Pickups.model:: This is the state: ", state);
    const [pickup] = await knex("Waste_pickups")
      .insert({
        user_id: userId,
        waste_type: category,
        kg,
        info: note,
        location: state + "" + wasteBank.lga,
        status: "pending",
      })
      .returning("*");

    return { success: true, message: pickup };
  } catch (err) {
    console.error("pickups.model::Error creating waste pickup:", err);
    return { success: false, error: "Server Error" };
  }
};

module.exports = { createPickup, getPickupCount, createWastePickup };
