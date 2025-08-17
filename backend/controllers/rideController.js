const Ride = require("../models/rideModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Get all available rides (public access)
exports.getAllRides = catchAsync(async (req, res, next) => {
	const { startLocation, destination, date, minSeats, maxPrice } = req.query;

	// Build filter object
	const filter = { status: "active" };

	if (startLocation) {
		filter.startLocation = { $regex: startLocation, $options: "i" };
	}

	if (destination) {
		filter.destination = { $regex: destination, $options: "i" };
	}

	if (date) {
		const searchDate = new Date(date);
		const nextDay = new Date(searchDate);
		nextDay.setDate(nextDay.getDate() + 1);

		filter.date = {
			$gte: searchDate,
			$lt: nextDay,
		};
	}

	if (minSeats) {
		filter.availableSeats = { $gte: parseInt(minSeats) };
	}

	if (maxPrice) {
		filter.price = { $lte: parseFloat(maxPrice) };
	}

	const rides = await Ride.find(filter)
		.populate("driver", "name rating vehicleInfo")
		.sort({ date: 1, time: 1 });

	res.status(200).json({
		status: "success",
		results: rides.length,
		data: {
			rides,
		},
	});
});

// Get ride by ID (public access but contact info only for logged users)
exports.getRide = catchAsync(async (req, res, next) => {
	const ride = await Ride.findById(req.params.id).populate(
		"driver",
		"name rating vehicleInfo"
	);

	if (!ride) {
		return next(new AppError("No ride found with that ID", 404));
	}

	// If user is not logged in, remove contact information
	if (!req.user) {
		ride.driver.phone = undefined;
		ride.driver.email = undefined;
	}

	res.status(200).json({
		status: "success",
		data: {
			ride,
		},
	});
});

// Create new ride (only drivers)
exports.createRide = catchAsync(async (req, res, next) => {
	const rideData = {
		...req.body,
		driver: req.user.id,
	};

	const newRide = await Ride.create(rideData);

	res.status(201).json({
		status: "success",
		data: {
			ride: newRide,
		},
	});
});

// Update ride (only the driver who created it)
exports.updateRide = catchAsync(async (req, res, next) => {
	const ride = await Ride.findById(req.params.id);

	if (!ride) {
		return next(new AppError("No ride found with that ID", 404));
	}

	// Check if user is the driver of this ride
	if (ride.driver._id.toString() !== req.user.id) {
		return next(new AppError("You can only update your own rides", 403));
	}

	// Prevent updating if ride has passengers
	if (ride.passengers.length > 0) {
		return next(
			new AppError("Cannot update ride with existing passengers", 400)
		);
	}

	const updatedRide = await Ride.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: "success",
		data: {
			ride: updatedRide,
		},
	});
});

// Delete ride (only the driver who created it)
exports.deleteRide = catchAsync(async (req, res, next) => {
	const ride = await Ride.findById(req.params.id);

	if (!ride) {
		return next(new AppError("No ride found with that ID", 404));
	}

	// Check if user is the driver of this ride
	if (ride.driver._id.toString() !== req.user.id) {
		return next(new AppError("You can only delete your own rides", 403));
	}

	// Prevent deleting if ride has passengers
	if (ride.passengers.length > 0) {
		return next(
			new AppError("Cannot delete ride with existing passengers", 400)
		);
	}

	await Ride.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: "success",
		data: null,
	});
});

// Book seats on a ride
exports.bookRide = catchAsync(async (req, res, next) => {
	const { seats = 1 } = req.body;
	const ride = await Ride.findById(req.params.id);

	if (!ride) {
		return next(new AppError("No ride found with that ID", 404));
	}

	// Check if user can book
	if (!ride.canBook(req.user.id, seats)) {
		return next(new AppError("Cannot book seats for this ride", 400));
	}

	// Book the seats
	ride.bookSeats(req.user.id, seats);
	await ride.save();

	res.status(200).json({
		status: "success",
		message: `Successfully booked ${seats} seat(s)`,
		data: {
			ride,
		},
	});
});

// Cancel booking
exports.cancelBooking = catchAsync(async (req, res, next) => {
	const ride = await Ride.findById(req.params.id);

	if (!ride) {
		return next(new AppError("No ride found with that ID", 404));
	}

	try {
		ride.cancelBooking(req.user.id);
		await ride.save();

		res.status(200).json({
			status: "success",
			message: "Booking cancelled successfully",
			data: {
				ride,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 400));
	}
});

// Get user's rides (as driver or passenger)
exports.getMyRides = catchAsync(async (req, res, next) => {
	const { role = "all" } = req.query;

	console.log("🔍 getMyRides - Role:", role);
	console.log("🔍 getMyRides - User ID:", req.user.id);

	let rides;

	try {
		if (role === "driver") {
			// Get rides where user is the driver
			console.log(
				"🔍 getMyRides - Querying driver rides for user:",
				req.user.id
			);
			rides = await Ride.find({ driver: req.user.id })
				.populate("passengers.user", "name email phone")
				.sort({ date: -1 });
			console.log("🔍 getMyRides - Driver rides found:", rides.length);
		} else if (role === "passenger") {
			// Get rides where user is a passenger
			console.log(
				"🔍 getMyRides - Querying passenger rides for user:",
				req.user.id
			);
			rides = await Ride.find({ "passengers.user": req.user.id })
				.populate("driver", "name email phone rating vehicleInfo")
				.sort({ date: -1 });
			console.log("🔍 getMyRides - Passenger rides found:", rides.length);
		} else {
			// Get all rides (as driver or passenger)
			console.log(
				"🔍 getMyRides - Querying all rides for user:",
				req.user.id
			);
			const driverRides = await Ride.find({ driver: req.user.id })
				.populate("passengers.user", "name email phone")
				.sort({ date: -1 });

			const passengerRides = await Ride.find({
				"passengers.user": req.user.id,
			})
				.populate("driver", "name email phone rating vehicleInfo")
				.sort({ date: -1 });

			rides = [...driverRides, ...passengerRides].sort(
				(a, b) => new Date(b.date) - new Date(a.date)
			);
			console.log("🔍 getMyRides - Total rides found:", rides.length);
		}

		console.log("🔍 getMyRides - Success, returning rides");

		res.status(200).json({
			status: "success",
			results: rides.length,
			data: {
				rides,
			},
		});
	} catch (error) {
		console.error("🔍 getMyRides - Error:", error);
		throw error;
	}
});

// Complete a ride (only the driver)
exports.completeRide = catchAsync(async (req, res, next) => {
	const ride = await Ride.findById(req.params.id);

	if (!ride) {
		return next(new AppError("No ride found with that ID", 404));
	}

	// Check if user is the driver of this ride
	if (ride.driver.toString() !== req.user.id) {
		return next(new AppError("You can only complete your own rides", 403));
	}

	// Check if ride is active
	if (ride.status !== "active") {
		return next(new AppError("Ride is not active", 400));
	}

	ride.status = "completed";
	await ride.save();

	res.status(200).json({
		status: "success",
		message: "Ride completed successfully",
		data: {
			ride,
		},
	});
});

// Cancel a ride (only the driver)
exports.cancelRide = catchAsync(async (req, res, next) => {
	const ride = await Ride.findById(req.params.id);

	if (!ride) {
		return next(new AppError("No ride found with that ID", 404));
	}

	// Check if user is the driver of this ride
	if (ride.driver.toString() !== req.user.id) {
		return next(new AppError("You can only cancel your own rides", 403));
	}

	// Check if ride is active
	if (ride.status !== "active") {
		return next(new AppError("Ride is not active", 400));
	}

	ride.status = "cancelled";
	await ride.save();

	res.status(200).json({
		status: "success",
		message: "Ride cancelled successfully",
		data: {
			ride,
		},
	});
});

// Get ride statistics for driver
exports.getRideStats = catchAsync(async (req, res, next) => {
	const stats = await Ride.aggregate([
		{
			$match: {
				driver: req.user._id,
				status: { $in: ["completed", "cancelled"] },
			},
		},
		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
				totalRevenue: { $sum: "$totalRevenue" },
			},
		},
	]);

	const totalRides = await Ride.countDocuments({ driver: req.user._id });
	const activeRides = await Ride.countDocuments({
		driver: req.user._id,
		status: "active",
	});

	res.status(200).json({
		status: "success",
		data: {
			stats,
			totalRides,
			activeRides,
		},
	});
});
