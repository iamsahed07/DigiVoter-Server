"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const givenVoteSchema = new mongoose_1.Schema({
    electionRef: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Election",
        required: true,
    },
    voterRef: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("GivenVote", givenVoteSchema);
