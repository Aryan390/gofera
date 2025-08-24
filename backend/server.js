const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
const errorHandler = require("./utils/errorHandler");

const userRoutes = require("./routes/userRoutes");
const rideRoutes = require("./routes/rideRoutes");

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/users", userRoutes);
app.use("/api/rides", rideRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Gofera API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global error handler
app.use(errorHandler);

// Only connect & listen when NOT running tests
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB successfully"))
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });

  const PORT = process.env.PORT || 5001; // avoid macOS ControlCenter on 5000
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  });

  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
      console.log(`Received ${signal}, closing MongoDB connection...`);
      await mongoose.connection.close();
      console.log("MongoDB connection closed. Exiting...");
      process.exit(0);
    });
  });
}

module.exports = app;
