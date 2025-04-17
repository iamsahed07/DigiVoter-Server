"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const electionSchema = new mongoose_1.Schema({
    electionName: {
        type: String,
        required: true,
    },
    areas: {
        type: {},
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Election", electionSchema);
