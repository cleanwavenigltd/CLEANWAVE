const express = require("express");
const router = express();
const notificationsControllers = require("../controllers/notificationsControllers");

router.post("/notifications", notificationsControllers.createNotification);

router.get(
  "/notifications/agents",
  notificationsControllers.getAgentNotifications
);
module.exports = router;
