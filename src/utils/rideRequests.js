import { API_BASE_URL } from "./constants";

export const rideRequests = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies for cross-origin requests
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Request failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
