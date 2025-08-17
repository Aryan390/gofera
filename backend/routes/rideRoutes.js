const express = require("express");
const rideController = require("../controllers/rideController");
const authController = require("../controllers/authController");

const router = express.Router();

// Public routes - can be accessed by everyone
router.get("/", rideController.getAllRides);
router.get("/:id", rideController.getRide);

// Protected routes - require authentication
router.use(authController.protect);

// Ride management routes (only drivers)
router.post("/", authController.requireDriver, rideController.createRide);
router.patch("/:id", authController.requireDriver, rideController.updateRide);
router.delete("/:id", authController.requireDriver, rideController.deleteRide);
router.patch(
	"/:id/complete",
	authController.requireDriver,
	rideController.completeRide
);
router.patch(
	"/:id/cancel",
	authController.requireDriver,
	rideController.cancelRide
);

// Booking routes
router.post("/:id/book", rideController.bookRide);
router.delete("/:id/cancel-booking", rideController.cancelBooking);

// User's rides
router.get("/my-rides", rideController.getMyRides);
router.get("/my-rides/stats", rideController.getRideStats);

module.exports = router;
