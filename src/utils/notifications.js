const publicVapidKey =
  "BIRMNPj-yzxkjyb7Kq3GzsPdusSBfKnGKmrgUy51LJvkPPR8_-YnugybHfKOiVPvrS5M9NkKnBsxxKvgQKWurlo"; // You'll get this from the server setup

export const subscribeToNotifications = async () => {
  console.log("from notificiations.js");
  try {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.log("Push notifications are not supported");
      alert("Push notifications are not supported by your browser.");
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    console.log("navigator.serviceWorker.ready");

    // Get permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return false;
    }

    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    // Send subscription to server
    await fetch("/api/users/notifications/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return true;
  } catch (error) {
    console.error("Error subscribing to notifications:", error);
    return false;
  }
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
