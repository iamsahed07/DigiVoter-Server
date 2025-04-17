"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../../@types");
const mongoose_1 = require("mongoose");
const electionSchema = new mongoose_1.Schema({
    electionName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: _types_1.status,
        required: true,
        default: "UPCOMING",
    },
    candidatesAsConstituency: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "CandidatesAsConstituency",
        },
    ],
    electionResult: {
        type: Number,
        default: 0,
    },
    allVotes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "GivenVote",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Election", electionSchema);
