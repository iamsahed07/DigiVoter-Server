"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const candidateSchema = new mongoose_1.Schema({
    candidateName: {
        type: String,
        required: true,
    },
    electionName: {
        type: String,
    },
    party: {
        type: String,
    },
    state: {
        type: String,
        required: true,
    },
    constituency: {
        type: String,
        required: true,
    },
    adhar: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: String,
        trim: true,
        required: true,
    },
    imgUrl: {
        type: String,
        trim: true,
    },
    votes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Candidate", candidateSchema);
