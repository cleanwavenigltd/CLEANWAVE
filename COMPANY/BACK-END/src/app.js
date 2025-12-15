const express = require("express");
const cors = require("cors");
require("dotenv").config;
const cookieParser = require("cookie-parser");
const authRoutes = require("../routes/authRoutes");
const app = express();
const pickupsRoutes = require("../routes/pickupsRoutes");
const userRoutes = require("../routes/userRoutes");
const agentsRoutes = require("../routes/agentsRoutes");
const waste_bankRoutes = require("../routes/waste_bankRoutes");
const aggregatorsRoutes = require("../routes/aggregatorsRoutes");
const adminRoutes = require("../routes/adminRoutes");
const walletRoutes = require("../routes/walletRoutes");
const profileRoutes = require("../routes/profileRoutes.js");
const waste_categoriesRoutes = require("../routes/waste_categoriesRoutes");
const transactionsRoutes = require("../routes/transactionsRoutes");
const notificationsRoutes = require("../routes/notificationsRoutes");

// app.use(cors());
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// API ROUTES FOR ALL ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/pickups", pickupsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/agents", agentsRoutes);
app.use("/api/wastebank", waste_bankRoutes);
app.use("/api/aggregator", aggregatorsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/waste-categories", waste_categoriesRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Cleanwave server is on" });
});

module.exports = app;
