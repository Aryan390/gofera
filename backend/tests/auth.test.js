const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/userModel");

describe("Authentication Endpoints", () => {
	let testUser;
	let authToken;

	beforeAll(async () => {
		try {
			// Connect to test database
			await mongoose.connect(
				process.env.MONGODB_URI_TEST ||
					"mongodb://localhost:27017/gofera_test"
			);
			console.log("✅ Connected to test database");
		} catch (error) {
			console.error("❌ Failed to connect to test database:", error);
			throw error;
		}
	});

	afterAll(async () => {
		try {
			await mongoose.connection.close();
			console.log("✅ Test database connection closed");
		} catch (error) {
			console.error("❌ Error closing test database:", error);
		}
	});

	beforeEach(async () => {
		try {
			// Clear database before each test
			await User.deleteMany({});

			// Create test user
			testUser = await User.create({
				name: "Test User",
				email: "test@example.com",
				password: "password123",
				passwordConfirm: "password123",
				phone: "+1234567890",
			});

			console.log("✅ Test user created:", testUser._id);
		} catch (error) {
			console.error("❌ Error in beforeEach:", error);
			throw error;
		}
	});

	describe("POST /api/users/signup", () => {
		it("should create a new user successfully", async () => {
			const userData = {
				name: "John Doe",
				email: "john@example.com",
				password: "password123",
				passwordConfirm: "password123",
				phone: "+1234567890",
			};

			const response = await request(app)
				.post("/api/users/signup")
				.send(userData)
				.expect(201);

			expect(response.body.status).toBe("success");
			expect(response.body.data.user.name).toBe(userData.name);
			expect(response.body.data.user.email).toBe(userData.email);
			expect(response.body.token).toBeDefined();
			expect(response.body.data.user.password).toBeUndefined();
		});

		it("should fail with mismatched passwords", async () => {
			const userData = {
				name: "John Doe",
				email: "john@example.com",
				password: "password123",
				passwordConfirm: "differentpassword",
				phone: "+1234567890",
			};

			const response = await request(app)
				.post("/api/users/signup")
				.send(userData)
				.expect(400);

			expect(response.body.status).toBe("fail");
		});

		it("should fail with invalid email", async () => {
			const userData = {
				name: "John Doe",
				email: "invalid-email",
				password: "password123",
				passwordConfirm: "password123",
				phone: "+1234567890",
			};

			const response = await request(app)
				.post("/api/users/signup")
				.send(userData)
				.expect(400);

			expect(response.body.status).toBe("fail");
		});

		it("should fail with short password", async () => {
			const userData = {
				name: "John Doe",
				email: "john@example.com",
				password: "123",
				passwordConfirm: "123",
				phone: "+1234567890",
			};

			const response = await request(app)
				.post("/api/users/signup")
				.send(userData)
				.expect(400);

			expect(response.body.status).toBe("fail");
		});
	});

	describe("POST /api/users/login", () => {
		it("should login successfully with correct credentials", async () => {
			const loginData = {
				email: "test@example.com",
				password: "password123",
			};

			const response = await request(app)
				.post("/api/users/login")
				.send(loginData)
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.data.user.email).toBe(loginData.email);
			expect(response.body.token).toBeDefined();
		});

		it("should fail with incorrect password", async () => {
			const loginData = {
				email: "test@example.com",
				password: "wrongpassword",
			};

			const response = await request(app)
				.post("/api/users/login")
				.send(loginData)
				.expect(401);

			expect(response.body.status).toBe("fail");
		});

		it("should fail with non-existent email", async () => {
			const loginData = {
				email: "nonexistent@example.com",
				password: "password123",
			};

			const response = await request(app)
				.post("/api/users/login")
				.send(loginData)
				.expect(401);

			expect(response.body.status).toBe("fail");
		});

		it("should fail with missing email", async () => {
			const loginData = {
				password: "password123",
			};

			const response = await request(app)
				.post("/api/users/login")
				.send(loginData)
				.expect(400);

			expect(response.body.status).toBe("fail");
		});
	});

	describe("GET /api/users/me", () => {
		beforeEach(async () => {
			// Login to get auth token
			const loginResponse = await request(app)
				.post("/api/users/login")
				.send({
					email: "test@example.com",
					password: "password123",
				});

			authToken = loginResponse.body.token;
		});

		it("should get user profile when authenticated", async () => {
			const response = await request(app)
				.get("/api/users/me")
				.set("Authorization", `Bearer ${authToken}`)
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.data.user.email).toBe("test@example.com");
		});

		it("should fail without authentication token", async () => {
			const response = await request(app)
				.get("/api/users/me")
				.expect(401);

			expect(response.body.status).toBe("fail");
		});
	});

	describe("PATCH /api/users/me", () => {
		beforeEach(async () => {
			// Login to get auth token
			const loginResponse = await request(app)
				.post("/api/users/login")
				.send({
					email: "test@example.com",
					password: "password123",
				});

			authToken = loginResponse.body.token;
		});

		it("should update user profile successfully", async () => {
			const updateData = {
				name: "Updated Name",
				phone: "+1987654321",
			};

			const response = await request(app)
				.patch("/api/users/me")
				.set("Authorization", `Bearer ${authToken}`)
				.send(updateData)
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.data.user.name).toBe(updateData.name);
			expect(response.body.data.user.phone).toBe(updateData.phone);
		});

		it("should not allow password update through this route", async () => {
			const updateData = {
				password: "newpassword",
				passwordConfirm: "newpassword",
			};

			const response = await request(app)
				.patch("/api/users/me")
				.set("Authorization", `Bearer ${authToken}`)
				.send(updateData)
				.expect(400);

			expect(response.body.status).toBe("fail");
		});
	});

	describe("GET /api/users/logout", () => {
		it("should logout successfully", async () => {
			const response = await request(app)
				.get("/api/users/logout")
				.expect(200);

			expect(response.body.status).toBe("success");
		});
	});
});
