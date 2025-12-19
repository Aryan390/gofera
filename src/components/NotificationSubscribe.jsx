import { useEffect, useState } from "react";
import { subscribeToNotifications } from "../utils/notifications";

const NotificationSubscribe = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if ("Notification" in window) {
      // Check if already subscribed
      if (Notification.permission === "granted") {
        setIsSubscribed(true);
      }
    }
  }, []);

  console.log(isSubscribed);

  const handleSubscribe = async () => {
    console.log("som");
    try {
      const success = await subscribeToNotifications();
      if (success) {
        setIsSubscribed(true);
        // Show success message
        console.log("Successfully subscribed to ride notifications!");
      } else {
        console.log("Failed to subscribe to notifications. Please try again.");
      }
    } catch (error) {
      console.log("Error subscribing to notifications:", error);
    }
  };

  if (!("Notification" in window)) {
    return null; // Don't show anything if notifications aren't supported
  }

  if (isSubscribed) {
    return (
      <div className="flex items-center text-sm text-green-600">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        Notifications enabled
      </div>
    );
  }

  return (
    <div className="fixed top-6 left-6 z-100">
      <button
        onClick={handleSubscribe}
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        Enable Notifications
      </button>
    </div>
  );
};

export default NotificationSubscribe;
