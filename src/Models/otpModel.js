const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        otp: {
            type: String,
            required: [true, "OTP is required"],
        },
        createdAt: { type: Date, expires: 300, default: Date.now },
    },
    { timestamp: true }
);

exports.Otp = mongoose.model("Otp", otpSchema);
