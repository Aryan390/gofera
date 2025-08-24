module.exports = (err, req, res, next) => {
  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.status = "fail";
    err.isOperational = true;
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    err.statusCode = 400;
    err.status = "fail";
    err.isOperational = true;
    err.message = "Duplicate field value. Please use another value.";
  }

  // Handle Mongoose cast errors (invalid ObjectId)
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.status = "fail";
    err.isOperational = true;
    err.message = "Invalid ID format.";
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.status = "fail";
    err.isOperational = true;
    err.message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.status = "fail";
    err.isOperational = true;
    err.message = "Token expired. Please log in again.";
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production error response
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Programming or unknown errors
      console.error("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
};
