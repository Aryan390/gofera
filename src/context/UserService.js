export class UserService {
  static baseURL = "http://localhost:5001/api/users";

  static async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
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
  }

  static async login(credentials) {
    return this.request("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  static async register(userData) {
    return this.request("/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  static async updateProfile(updateData) {
    return this.request("/me", {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  }

  // static async refreshToken() {
  //   return this.request("/refresh-token", {
  //     method: "POST",
  //   });
  // }

  static async getUserProfile() {
    return this.request("/me", {
      method: "GET",
    });
  }

  static async logout() {
    return this.request("/logout", {
      method: "GET",
    });
  }

  static async checkAuth() {
    return this.request("/me", {
      method: "GET",
    });
  }
}
