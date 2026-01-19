const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        password: {
            type: String,
            required: true,
            select: false, // 🔐 password kabhi response me nahi aayega

        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",

        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Employee", employeeSchema);