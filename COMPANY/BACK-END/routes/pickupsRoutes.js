const express = require("express");
const router = express();
const { authenticate } = require("../controllers/authControllers");
const {
  getPickupCountRequests,
  createPickupRequest,
  wastePickupRequest,
} = require("../controllers/pickupsController");

router.get("/count", authenticate, getPickupCountRequests);
router.post("/create", authenticate, createPickupRequest);
router.post("/waste-pickup", authenticate, wastePickupRequest);

module.exports = router;
