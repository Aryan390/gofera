const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/userModel");
const Ride = require("../models/rideModel");

describe("Ride Endpoints", () => {
	let testUser;
	let testDriver;
	let testRide;
	let authToken;
	let driverToken;

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
			await Ride.deleteMany({});

			// Create test user
			testUser = await User.create({
				name: "Test User",
				email: "user@example.com",
				password: "password123",
				passwordConfirm: "password123",
				phone: "+1234567890",
			});

			// Create test driver
			testDriver = await User.create({
				name: "Test Driver",
				email: "driver@example.com",
				password: "password123",
				passwordConfirm: "password123",
				phone: "+1234567891",
				isDriver: true,
				vehicleInfo: {
					make: "Toyota",
					model: "Camry",
					year: 2020,
					color: "White",
				},
			});

			// Create test ride
			testRide = await Ride.create({
				driver: testDriver._id,
				startLocation: "Downtown Seattle",
				destination: "Portland, OR",
				date: new Date("2024-02-15"),
				time: "14:00",
				eta: 3.5,
				availableSeats: 3,
				price: 45,
				description: "Comfortable ride to Portland",
			});

			// Get auth tokens
			const userLoginResponse = await request(app)
				.post("/api/users/login")
				.send({
					email: "user@example.com",
					password: "password123",
				});

			authToken = userLoginResponse.body.token;

			const driverLoginResponse = await request(app)
				.post("/api/users/login")
				.send({
					email: "driver@example.com",
					password: "password123",
				});

			driverToken = driverLoginResponse.body.token;
		} catch (error) {
			console.error("❌ Error in beforeEach:", error);
			throw error;
		}
	});

	describe("GET /api/rides", () => {
		it("should get all available rides", async () => {
			const response = await request(app).get("/api/rides").expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.results).toBe(1);
			expect(response.body.data.rides).toHaveLength(1);
			expect(response.body.data.rides[0].startLocation).toBe(
				"Downtown Seattle"
			);
		});

		it("should filter rides by destination", async () => {
			const response = await request(app)
				.get("/api/rides?destination=Portland")
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.results).toBe(1);
		});

		it("should filter rides by start location", async () => {
			const response = await request(app)
				.get("/api/rides?startLocation=Seattle")
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.results).toBe(1);
		});

		it("should filter rides by date", async () => {
			const response = await request(app)
				.get("/api/rides?date=2024-02-15")
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.results).toBe(1);
		});

		it("should filter rides by minimum seats", async () => {
			const response = await request(app)
				.get("/api/rides?minSeats=2")
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.results).toBe(1);
		});

		it("should filter rides by maximum price", async () => {
			const response = await request(app)
				.get("/api/rides?maxPrice=50")
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.results).toBe(1);
		});
	});

	describe("GET /api/rides/:id", () => {
		it("should get ride by ID", async () => {
			const response = await request(app)
				.get(`/api/rides/${testRide._id}`)
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.data.ride._id).toBe(testRide._id.toString());
		});

		it("should return 404 for non-existent ride", async () => {
			const fakeId = new mongoose.Types.ObjectId();
			const response = await request(app)
				.get(`/api/rides/${fakeId}`)
				.expect(404);

			expect(response.body.status).toBe("fail");
		});
	});

	describe("POST /api/rides", () => {
		it("should create new ride when user is driver", async () => {
			const rideData = {
				startLocation: "Bellevue",
				destination: "Seattle",
				date: "2024-02-20",
				time: "09:00",
				eta: 1.5,
				availableSeats: 2,
				price: 25,
				description: "Morning commute",
			};

			const response = await request(app)
				.post("/api/rides")
				.set("Authorization", `Bearer ${driverToken}`)
				.send(rideData)
				.expect(201);

			expect(response.body.status).toBe("success");
			expect(response.body.data.ride.startLocation).toBe(
				rideData.startLocation
			);
			expect(response.body.data.ride.driver).toBe(
				testDriver._id.toString()
			);
		});

		it("should fail when non-driver tries to create ride", async () => {
			const rideData = {
				startLocation: "Bellevue",
				destination: "Seattle",
				date: "2024-02-20",
				time: "09:00",
				eta: 1.5,
				availableSeats: 2,
				price: 25,
			};

			const response = await request(app)
				.post("/api/rides")
				.set("Authorization", `Bearer ${authToken}`)
				.send(rideData)
				.expect(403);

			expect(response.body.status).toBe("fail");
		});

		it("should fail without authentication", async () => {
			const rideData = {
				startLocation: "Bellevue",
				destination: "Seattle",
				date: "2024-02-20",
				time: "09:00",
				eta: 1.5,
				availableSeats: 2,
				price: 25,
			};

			const response = await request(app)
				.post("/api/rides")
				.send(rideData)
				.expect(401);

			expect(response.body.status).toBe("fail");
		});
	});

	describe("PATCH /api/rides/:id", () => {
		it("should update ride when driver is authenticated", async () => {
			const updateData = {
				price: 50,
				description: "Updated description",
			};

			const response = await request(app)
				.patch(`/api/rides/${testRide._id}`)
				.set("Authorization", `Bearer ${driverToken}`)
				.send(updateData)
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.data.ride.price).toBe(updateData.price);
			expect(response.body.data.ride.description).toBe(
				updateData.description
			);
		});

		it("should fail when non-driver tries to update ride", async () => {
			const updateData = {
				price: 50,
			};

			const response = await request(app)
				.patch(`/api/rides/${testRide._id}`)
				.set("Authorization", `Bearer ${authToken}`)
				.send(updateData)
				.expect(403);

			expect(response.body.status).toBe("fail");
		});

		it("should fail when driver tries to update another driver's ride", async () => {
			// Create another driver
			const anotherDriver = await User.create({
				name: "Another Driver",
				email: "another@example.com",
				password: "password123",
				passwordConfirm: "password123",
				phone: "+1234567892",
				isDriver: true,
			});

			const anotherDriverLogin = await request(app)
				.post("/api/users/login")
				.send({
					email: "another@example.com",
					password: "password123",
				});

			const updateData = {
				price: 50,
			};

			const response = await request(app)
				.patch(`/api/rides/${testRide._id}`)
				.set("Authorization", `Bearer ${anotherDriverLogin.body.token}`)
				.send(updateData)
				.expect(403);

			expect(response.body.status).toBe("fail");
		});
	});

	describe("POST /api/rides/:id/book", () => {
		it("should book seats successfully", async () => {
			const bookingData = {
				seats: 2,
			};

			const response = await request(app)
				.post(`/api/rides/${testRide._id}/book`)
				.set("Authorization", `Bearer ${authToken}`)
				.send(bookingData)
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.message).toContain(
				"Successfully booked 2 seat(s)"
			);
		});

		it("should fail when trying to book more seats than available", async () => {
			const bookingData = {
				seats: 5,
			};

			const response = await request(app)
				.post(`/api/rides/${testRide._id}/book`)
				.set("Authorization", `Bearer ${authToken}`)
				.send(bookingData)
				.expect(400);

			expect(response.body.status).toBe("fail");
		});

		it("should fail when driver tries to book their own ride", async () => {
			const bookingData = {
				seats: 1,
			};

			const response = await request(app)
				.post(`/api/rides/${testRide._id}/book`)
				.set("Authorization", `Bearer ${driverToken}`)
				.send(bookingData)
				.expect(400);

			expect(response.body.status).toBe("fail");
		});
	});

	describe("DELETE /api/rides/:id/cancel-booking", () => {
		beforeEach(async () => {
			// Book seats first
			await request(app)
				.post(`/api/rides/${testRide._id}/book`)
				.set("Authorization", `Bearer ${authToken}`)
				.send({ seats: 1 });
		});

		it("should cancel booking successfully", async () => {
			const response = await request(app)
				.delete(`/api/rides/${testRide._id}/cancel-booking`)
				.set("Authorization", `Bearer ${authToken}`)
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.message).toBe(
				"Booking cancelled successfully"
			);
		});

		it("should fail when user tries to cancel non-existent booking", async () => {
			// Create another user
			const anotherUser = await User.create({
				name: "Another User",
				email: "anotheruser@example.com",
				password: "password123",
				passwordConfirm: "password123",
				phone: "+1234567893",
			});

			const anotherUserLogin = await request(app)
				.post("/api/users/login")
				.send({
					email: "anotheruser@example.com",
					password: "password123",
				});

			const response = await request(app)
				.delete(`/api/rides/${testRide._id}/cancel-booking`)
				.set("Authorization", `Bearer ${anotherUserLogin.body.token}`)
				.expect(400);

			expect(response.body.status).toBe("fail");
		});
	});

	describe("GET /api/rides/my-rides", () => {
		it("should get user's rides as passenger", async () => {
			// Book a ride first
			await request(app)
				.post(`/api/rides/${testRide._id}/book`)
				.set("Authorization", `Bearer ${authToken}`)
				.send({ seats: 1 });

			const response = await request(app)
				.get("/api/rides/my-rides?role=passenger")
				.set("Authorization", `Bearer ${authToken}`)
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.results).toBe(1);
		});

		it("should get user's rides as driver", async () => {
			const response = await request(app)
				.get("/api/rides/my-rides?role=driver")
				.set("Authorization", `Bearer ${driverToken}`)
				.expect(200);

			expect(response.body.status).toBe("success");
			expect(response.body.results).toBe(1);
		});
	});
});
