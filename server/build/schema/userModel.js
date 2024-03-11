"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
}, { timestamps: true });
module.exports = mongoose.model("AuthUserDetails", UserSchema);
