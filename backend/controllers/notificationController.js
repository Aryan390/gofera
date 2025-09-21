const webpush = require("web-push");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

// Set VAPID keys - you'll need to generate these
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  "mailto:your-email@gofera.com", // Replace with your email
  publicVapidKey,
  privateVapidKey
);

exports.subscribeToNotifications = catchAsync(async (req, res) => {
  const subscription = req.body;
  const userId = req.user.id;

  // Store subscription in user document
  await User.findByIdAndUpdate(userId, {
    pushSubscription: subscription,
  });

  res.status(201).json({
    status: "success",
    message: "Successfully subscribed to notifications",
  });
});

exports.sendNewRideNotification = async (ride) => {
  try {
    // Get all users with push subscriptions
    const users = await User.find({
      pushSubscription: { $exists: true, $ne: null },
    });

    // Prepare notification payload
    const payload = JSON.stringify({
      title: "New Ride Available!",
      body: `${ride.from} to ${ride.to} - ${ride.date}`,
      url: `/rides/${ride._id}`,
    });

    // Send notifications to all subscribed users
    const notifications = users.map((user) => {
      return webpush
        .sendNotification(user.pushSubscription, payload)
        .catch((error) => {
          console.error(
            `Error sending notification to user ${user._id}:`,
            error
          );
          // If subscription is invalid, remove it
          if (error.statusCode === 410) {
            return User.findByIdAndUpdate(user._id, {
              $unset: { pushSubscription: 1 },
            });
          }
        });
    });

    await Promise.all(notifications);
  } catch (error) {
    console.error("Error sending ride notifications:", error);
  }
};
