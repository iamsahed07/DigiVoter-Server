"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const elections_1 = require("../controllars/elections");
const router = express_1.default.Router();
router.post('/create', elections_1.createElection);
router.delete('/delete-an-election', elections_1.deleteAnElection);
router.get('/get-all', elections_1.getAllElections);
router.get('/get-all-statesAndConsituency', elections_1.getAllStatesAndConstituency);
exports.default = router;
