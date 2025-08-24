const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Signup
exports.signup = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    isDriver,
    // vehicleInfo,
  } = req.body;

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
    phone,
    isDriver: isDriver || false,
    // vehicleInfo: isDriver ? vehicleInfo : undefined,
  });

  createSendToken(newUser, 201, res);
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password +active");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Check if user account is active
  if (!user.active) {
    return next(new AppError("Your account has been deactivated", 401));
  }

  createSendToken(user, 200, res);
});

// Logout
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

// Protect routes - check if user is logged in
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // Get token from header or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  // Check if user changed password after token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError("User recently changed password! Please log in again.", 401)
  //   );
  // }

  // Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Restrict to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

// Check if user is driver
exports.requireDriver = catchAsync(async (req, res, next) => {
  if (!req.user.isDriver) {
    return next(new AppError("Only drivers can perform this action", 403));
  }
  next();
});

// Get current user profile
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Update current user profile
exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user tries to update password
  if (req.body.password) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // Filter out unwanted fields
  const filteredBody = { ...req.body };
  const allowedFields = ["name", "email", "phone"];
  Object.keys(filteredBody).forEach((key) => {
    if (!allowedFields.includes(key)) delete filteredBody[key];
  });

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  // Get user with password
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError("Your current password is incorrect.", 401));
  }

  // Update password
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});

// Forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("There is no user with this email address.", 404));
  }

  // Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send reset token via email (implement email service)
  // For now, just return the token
  res.status(200).json({
    status: "success",
    message: "Token sent to email!",
    resetToken,
  });
});

// Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;

  // Get user based on token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // Set new password
  user.password = password;
  //   user.passwordConfirm = passwordConfirm;
  //   user.passwordResetToken = undefined;
  //   user.passwordResetExpires = undefined;
  await user.save();

  // Log user in
  createSendToken(user, 200, res);
});
