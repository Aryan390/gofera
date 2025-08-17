const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
	{
		driver: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Ride must belong to a driver"],
		},
		startLocation: {
			type: String,
			required: [true, "Please provide starting location"],
			trim: true,
		},
		destination: {
			type: String,
			required: [true, "Please provide destination"],
			trim: true,
		},
		date: {
			type: Date,
			required: [true, "Please provide departure date"],
		},
		time: {
			type: String,
			required: [true, "Please provide departure time"],
		},
		eta: {
			type: Number,
			required: [true, "Please provide estimated travel time"],
			min: [0.5, "ETA must be at least 0.5 hours"],
		},
		availableSeats: {
			type: Number,
			required: [true, "Please provide number of available seats"],
			min: [1, "Must have at least 1 seat available"],
			max: [8, "Cannot have more than 8 seats"],
		},
		price: {
			type: Number,
			required: [true, "Please provide price per person"],
			min: [0, "Price cannot be negative"],
		},
		description: {
			type: String,
			trim: true,
			maxlength: [500, "Description cannot exceed 500 characters"],
		},
		status: {
			type: String,
			enum: ["active", "booked", "completed", "cancelled"],
			default: "active",
		},
		passengers: [
			{
				user: {
					type: mongoose.Schema.ObjectId,
					ref: "User",
				},
				seats: {
					type: Number,
					default: 1,
					min: 1,
				},
				bookedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		vehicleInfo: {
			make: String,
			model: String,
			year: Number,
			color: String,
		},
		pickupPoints: [
			{
				location: String,
				time: String,
			},
		],
		restrictions: {
			smoking: {
				type: Boolean,
				default: false,
			},
			pets: {
				type: Boolean,
				default: false,
			},
			luggage: {
				type: Boolean,
				default: true,
			},
		},
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Virtual for remaining seats
rideSchema.virtual("remainingSeats").get(function () {
	const bookedSeats = this.passengers.reduce(
		(total, passenger) => total + passenger.seats,
		0
	);
	return this.availableSeats - bookedSeats;
});

// Virtual for total revenue
rideSchema.virtual("totalRevenue").get(function () {
	const bookedSeats = this.passengers.reduce(
		(total, passenger) => total + passenger.seats,
		0
	);
	return bookedSeats * this.price;
});

// Virtual for isFull
rideSchema.virtual("isFull").get(function () {
	return this.remainingSeats <= 0;
});

// Indexes for better query performance
rideSchema.index({ driver: 1, status: 1 });
rideSchema.index({ startLocation: 1, destination: 1 });
rideSchema.index({ date: 1, status: 1 });
rideSchema.index({ status: 1, active: 1 });

// Pre-find middleware to populate driver information
rideSchema.pre(/^find/, function (next) {
	this.populate({
		path: "driver",
		select: "name email phone rating vehicleInfo",
	});

	next();
});

// Pre-find middleware to filter out inactive rides
rideSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

// Instance method to check if user can book
rideSchema.methods.canBook = function (userId, seats = 1) {
	if (this.status !== "active") return false;
	if (this.driver._id.toString() === userId.toString()) return false;
	if (this.remainingSeats < seats) return false;

	// Check if user already has a booking
	const existingBooking = this.passengers.find(
		(p) => p.user.toString() === userId.toString()
	);
	if (existingBooking) return false;

	return true;
};

// Instance method to book seats
rideSchema.methods.bookSeats = function (userId, seats = 1) {
	if (!this.canBook(userId, seats)) {
		throw new Error("Cannot book seats for this ride");
	}

	this.passengers.push({
		user: userId,
		seats: seats,
	});

	return this;
};

// Instance method to cancel booking
rideSchema.methods.cancelBooking = function (userId) {
	const passengerIndex = this.passengers.findIndex(
		(p) => p.user.toString() === userId.toString()
	);
	if (passengerIndex === -1) {
		throw new Error("No booking found for this user");
	}

	this.passengers.splice(passengerIndex, 1);
	return this;
};

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
