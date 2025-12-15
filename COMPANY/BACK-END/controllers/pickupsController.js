const {
  createPickup,
  getPickupCount,
  createWastePickup,
} = require("../models/pickups.model");

const getPickupCountRequests = async (req, res) => {
  try {
    const { userId } = req.user;
    const pickups = await getPickupCount(userId);
    // console.log("this is the pickups",pickups);
    res.status(200).json({ pickups });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: `Server Error` });
  }
};

const createPickupRequest = async (req, res) => {
  try {
    const { category, kg, location } = req.body;
    const userId = req.user.userId;
    console.log("userID", req.user);
    console.log("body", req.body);

    if (!userId || !kg || !category || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const pickup = await createPickup({ userId, kg, category, location });
    console.log("pickup creation result:", pickup);

    if (pickup.success) {
      res.status(201).json({ success: true, data: pickup.message });
    } else {
      res.status(400).json({ error: pickup.error });
    }
  } catch (err) {
    console.error("Error creating pickup request:", err);
    res.status(500).json({ error: `Server Error` });
  }
};

const wastePickupRequest = async (req, res) => {
  try {
    const { category, kg, note } = req.body;
    const userId = req.user.userId;

    if (!userId || !category || !kg) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const pickup = await createWastePickup({
      userId,
      category,
      kg,
      note,
    });

    if (pickup.success) {
      res.status(201).json({ success: true, data: pickup.message });
    } else {
      res.status(400).json({ error: pickup.error });
    }
  } catch (err) {
    console.error("Error creating waste pickup request:", err);
    res.status(500).json({ error: `Server Error` });
  }
};

module.exports = {
  getPickupCountRequests,
  createPickupRequest,
  wastePickupRequest,
};
