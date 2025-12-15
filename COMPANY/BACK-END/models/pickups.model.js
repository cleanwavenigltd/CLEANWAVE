const knex = require("../db/knex");
const { createNotification } = require("./notifications.model");

const createPickup = async ({ userId, category, kg, location }) => {
  // const location = await knex("Users")
  // find any aggregator at this location
  const locValue =
    typeof location === "object" && location !== null
      ? location.location || location.name || location.city
      : location;

  console.log("Location Value:", locValue);

  try {
    const aggregator = await knex("Users")
      .where("location", locValue)
      .andWhere({ role: "aggregator" })
      .first();
    console.log(aggregator || "no aggregator");

    if (!aggregator) {
      return {
        success: false,
        error: "No pickups available at this location",
      };
    }
  } catch (err) {
    console.log("Console Error: ", err);
    return "Server error";
  }

  const [pickup] = await knex("Pickups")
    .insert({
      user_id: userId,
      kg,
      category,
      // agent_id: agentId,
      // location,
      status: "pending",
    })
    .returning("*");
  // await createNotification({
  //   userId: agentId,
  //   message: `New pickup request assigned to you. Pickup ID: ${pickup.id}, Location: ${location.location}, Category: ${category}, Weight: ${kg}kg.`,
  // });

  //   await knex("Notifications").insert({
  //     user_id: agent.user_id,
  //     message: `New pickup request assigned to you. Pickup ID: ${pickup.id}, Location: ${location.location}, Category: ${category}, Weight: ${kg}kg.`,
  //     is_read: false,
  //   });

  return { success: true, message: pickup };
};

const getPickupCount = async (userId) => {
  // const pickups = await knex("Pickups").where({ user_id: userId });
  // return pickups;
  const pickups = await knex("Pickups")
    .where({ user_id: userId })
    .count("* as count")
    .first();
  return pickups.count || 0;
};
const createWastePickup = async ({ userId, category, kg, note }) => {
  try {
    const wasteBank = await knex("Users").where({ id: userId }).first();
    const location = wasteBank.location;
    console.log("Pickups.model:: This is the location: ", location);
    const [pickup] = await knex("Waste_pickups")
      .insert({
        user_id: userId,
        waste_type: category,
        kg,
        info: note,
        location,
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
