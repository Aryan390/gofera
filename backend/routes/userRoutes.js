const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// Public routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/drivers", userController.getDrivers);
router.get("/search", userController.searchUsers);

// Protected routes - require authentication
router.use(authController.protect);

// User profile routes
router.get("/me", authController.getMe);
router.patch("/me", authController.updateMe);
// router.patch("/updateMyPassword", authController.updatePassword);
router.delete("/me/:id", userController.deleteUser);

// Driver routes
router.patch(
  "/become-driver",
  // authController.requireDriver,
  userController.becomeDriver
);

// User management routes
router.get("/stats", userController.getUserStats);
router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Rating routes
// router.post("/:userId/rate", userController.rateUser);

// Password reset routes
// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

module.exports = router;
