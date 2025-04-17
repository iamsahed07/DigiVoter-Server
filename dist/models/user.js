"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const constituency_1 = require("../utils/constituency");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        enum: constituency_1.States,
    },
    constituency: {
        type: String,
        required: true,
        enum: constituency_1.constituency,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    adhar: {
        type: String,
        required: true,
        unique: true,
    },
    tokens: [String],
    role: {
        type: String,
        enum: _types_1.role,
        default: "Voter",
    },
    dob: {
        type: String,
        trim: true,
        required: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    voterId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    imgUrl: {
        type: String,
        trim: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
