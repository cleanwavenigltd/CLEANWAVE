const knex = require("../db/knex");

const getNotifications = (userId) => {
  return knex("Notifications")
    .where({ user_id: userId })
    .orderBy("created_at", "desc");
};

const markAsRead = async (notificationId) => {
  await knex("Notifications")
    .where({ id: notificationId })
    .update({ is_read: true });
};

const createNotification = async ({ userId, message }) => {
  const [notification] = await knex("Notifications")
    .insert({
      user_id: userId,
      message,
      is_read: false,
    })
    .returning("*");
  return notification;
};
module.exports = { getNotifications, markAsRead,createNotification };
