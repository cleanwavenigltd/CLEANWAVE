const express = require("express");
const router = express();
const { authenticate } = require("../controllers/authControllers");
const {
  getPickupCountRequests,
  createPickupRequest,
  wastePickupRequest,
  getPendingPickups,
  getAcceptedPickups,
  getDeliveredPickups,
  acceptPickup,
  wasteDelivered,
} = require("../controllers/pickupsController");

router.get("/count", authenticate, getPickupCountRequests);
router.post("/create", authenticate, createPickupRequest);
router.post("/waste-pickup", authenticate, wastePickupRequest);
router.get("/agent/pending", authenticate, getPendingPickups);
router.get("/agent/accepted", authenticate, getAcceptedPickups);
router.get("/agent/delivered", authenticate, getDeliveredPickups);
router.post("/:id/accept", authenticate, acceptPickup);
router.post("/waste-bank/delivered", authenticate, wasteDelivered);

module.exports = router;
