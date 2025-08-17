const User = require("../models/userModel");
const Ride = require("../models/rideModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Get all users (admin only)
exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.find().select("-password");

	res.status(200).json({
		status: "success",
		results: users.length,
		data: {
			users,
		},
	});
});

// Get user by ID
exports.getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id).select("-password");

	if (!user) {
		return next(new AppError("No user found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
});

// Update user profile (only the user themselves)
exports.updateUser = catchAsync(async (req, res, next) => {
	// Filter out unwanted fields
	const filteredBody = { ...req.body };
	const allowedFields = ["name", "email", "phone", "vehicleInfo"];
	Object.keys(filteredBody).forEach((key) => {
		if (!allowedFields.includes(key)) delete filteredBody[key];
	});

	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		filteredBody,
		{
			new: true,
			runValidators: true,
		}
	).select("-password");

	res.status(200).json({
		status: "success",
		data: {
			user: updatedUser,
		},
	});
});

// Delete user account
exports.deleteUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new AppError("No user found with that ID", 404));
	}

	// Check if user is deleting their own account
	if (req.user.id !== req.params.id) {
		return next(new AppError("You can only delete your own account", 403));
	}

	// Check if user has active rides
	const activeRides = await Ride.find({
		$or: [
			{ driver: req.user.id, status: "active" },
			{ "passengers.user": req.user.id, status: "active" },
		],
	});

	if (activeRides.length > 0) {
		return next(
			new AppError("Cannot delete account with active rides", 400)
		);
	}

	await User.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: "success",
		data: null,
	});
});

// Get user statistics
exports.getUserStats = catchAsync(async (req, res, next) => {
	const userId = req.params.id || req.user.id;

	// Get user's ride statistics
	const driverStats = await Ride.aggregate([
		{
			$match: { driver: userId },
		},
		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
				totalRevenue: { $sum: "$totalRevenue" },
			},
		},
	]);

	const passengerStats = await Ride.aggregate([
		{
			$match: { "passengers.user": userId },
		},
		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
			},
		},
	]);

	const totalDriverRides = await Ride.countDocuments({ driver: userId });
	const totalPassengerRides = await Ride.countDocuments({
		"passengers.user": userId,
	});

	res.status(200).json({
		status: "success",
		data: {
			driverStats,
			passengerStats,
			totalDriverRides,
			totalPassengerRides,
		},
	});
});

// Update user to driver status
exports.becomeDriver = catchAsync(async (req, res, next) => {
	const { vehicleInfo } = req.body;

	if (!vehicleInfo) {
		return next(
			new AppError(
				"Vehicle information is required to become a driver",
				400
			)
		);
	}

	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{
			isDriver: true,
			vehicleInfo,
		},
		{
			new: true,
			runValidators: true,
		}
	).select("-password");

	res.status(200).json({
		status: "success",
		message: "Successfully became a driver!",
		data: {
			user: updatedUser,
		},
	});
});

// Get drivers list (public access)
exports.getDrivers = catchAsync(async (req, res, next) => {
	const drivers = await User.find({
		isDriver: true,
		active: true,
	}).select("name rating totalRides vehicleInfo");

	res.status(200).json({
		status: "success",
		results: drivers.length,
		data: {
			drivers,
		},
	});
});

// Search users
exports.searchUsers = catchAsync(async (req, res, next) => {
	const { name, email, isDriver } = req.query;

	const filter = { active: true };

	if (name) {
		filter.name = { $regex: name, $options: "i" };
	}

	if (email) {
		filter.email = { $regex: email, $options: "i" };
	}

	if (isDriver !== undefined) {
		filter.isDriver = isDriver === "true";
	}

	const users = await User.find(filter)
		.select("name email isDriver rating totalRides")
		.limit(20);

	res.status(200).json({
		status: "success",
		results: users.length,
		data: {
			users,
		},
	});
});

// Rate a user (after ride completion)
exports.rateUser = catchAsync(async (req, res, next) => {
	const { rating, comment } = req.body;
	const { userId } = req.params;

	if (!rating || rating < 1 || rating > 5) {
		return next(
			new AppError("Please provide a valid rating between 1 and 5", 400)
		);
	}

	const userToRate = await User.findById(userId);
	if (!userToRate) {
		return next(new AppError("User not found", 404));
	}

	// Check if users have completed a ride together
	const completedRide = await Ride.findOne({
		$or: [
			{
				driver: req.user.id,
				"passengers.user": userId,
				status: "completed",
			},
			{
				driver: userId,
				"passengers.user": req.user.id,
				status: "completed",
			},
		],
	});

	if (!completedRide) {
		return next(
			new AppError(
				"You can only rate users you have completed rides with",
				400
			)
		);
	}

	// Update user's rating
	const currentRating = userToRate.rating;
	const totalRides = userToRate.totalRides;

	const newRating = (currentRating * totalRides + rating) / (totalRides + 1);

	userToRate.rating = newRating;
	userToRate.totalRides = totalRides + 1;

	await userToRate.save();

	res.status(200).json({
		status: "success",
		message: "Rating submitted successfully",
		data: {
			user: {
				id: userToRate._id,
				name: userToRate.name,
				rating: userToRate.rating,
				totalRides: userToRate.totalRides,
			},
		},
	});
});
