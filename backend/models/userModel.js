const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      validate: {
        validator: function (v) {
          return /^[\+]?[1-9][\d]{0,15}$/.test(v);
        },
        message: "Please provide a valid phone number",
      },
    },
    pushSubscription: {
      type: Object,
      select: false,
    },
    isDriver: {
      type: Boolean,
      default: false,
    },
    // vehicleInfo: {
    //   make: String,
    //   model: String,
    //   year: Number,
    //   color: String,
    //   licensePlate: String,
    // },
    // rating: {
    //   type: Number,
    //   default: 0,
    //   min: [0, "Rating must be at least 0"],
    //   max: [5, "Rating cannot exceed 5"],
    // },
    // totalRides: {
    //   type: Number,
    //   default: 0,
    // },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    // passwordResetToken: String,
    // passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for average rating
// userSchema.virtual("averageRating").get(function () {
//   return this.rating.toFixed(1);
// });

// Index for better query performance
userSchema.index({ isDriver: 1 });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to check if password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password was changed after token was issued
// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );
//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

// Instance method to create password reset token
// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");

//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

//   return resetToken;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
