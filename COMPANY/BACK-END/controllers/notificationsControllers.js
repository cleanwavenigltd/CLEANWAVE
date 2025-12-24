const knex = require("../db/knex");

// ===============================
// Create Notification
// ===============================
exports.createNotification = async (req, res) => {
  try {
    const { title, message, recipientRole } = req.body;

    if (!title || !message || !recipientRole) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await knex("Notifications").insert({
      title,
      message,
      recipient_role: recipientRole,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully.",
    });
  } catch (error) {
    console.error("Notification Error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

// ===============================
// Get Agent Notifications
// ===============================
exports.getAgentNotifications = async (req, res) => {
  try {
    const notifications = await knex("Notifications")
      .where({ recipient_role: "agent" })
      .orderBy("created_at", "desc");

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};