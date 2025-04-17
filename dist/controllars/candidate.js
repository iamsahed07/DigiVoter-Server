"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCandidate = exports.getAllCandidateBasedOnElectionName = exports.getAllCandidateBasedOnState = exports.getAllCandidateBasedOnConstituency = exports.addCandidate = void 0;
const candidate_1 = __importDefault(require("../models/candidate"));
const cloud_1 = __importDefault(require("../cloud"));
const addCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { electionName, candidateName, party, constituency, adhar, state, dob, } = req.body;
        const candidate = yield candidate_1.default.findOne({ adhar });
        if (candidate)
            return res
                .status(300)
                .json({ error: "Candidate already exists", success: false });
        const imgFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.profile;
        if (!imgFile)
            return res.status(422).json({ error: "Image file is missing!" });
        const imgRes = yield cloud_1.default.uploader.upload(imgFile.filepath, {
            resource_type: "image",
        });
        const newCandidate = new candidate_1.default({
            electionName,
            candidateName,
            party,
            constituency,
            adhar,
            state,
            dob,
            imgUrl: imgRes.secure_url
        });
        yield newCandidate.save();
        res.status(200).json({
            message: "Candidate added successfully",
            newCandidate,
            success: true,
        });
    }
    catch (err) {
        res.status(300).json({ error: err.message, success: false });
    }
});
exports.addCandidate = addCandidate;
function getAllCandidateBasedOnConstituency(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { electionName, state, constituency } = req.body;
            const candidateBasedConstituency = yield candidate_1.default.find({
                state,
                constituency,
                electionName
            });
            res.status(200).json({
                message: "Candidate cadidateBasedConstituency successfully fetched",
                success: true,
                candidateBasedConstituency,
            });
        }
        catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    });
}
exports.getAllCandidateBasedOnConstituency = getAllCandidateBasedOnConstituency;
function getAllCandidateBasedOnState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { electionName, state } = req.body;
            const candidateBasedStates = yield candidate_1.default.find({
                state,
                electionName,
            });
            res.status(200).json({
                message: "Candidate cadidateBasedOn States successfully fetched",
                success: true,
                candidateBasedStates,
            });
        }
        catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    });
}
exports.getAllCandidateBasedOnState = getAllCandidateBasedOnState;
function getAllCandidateBasedOnElectionName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { electionName } = req.body;
            const cadidateBasedOnElectionName = yield candidate_1.default.find({
                electionName,
            });
            res.status(200).json({
                message: "Candidate cadidateBasedOnElectionName successfully fetched",
                success: true,
                cadidateBasedOnElectionName,
            });
        }
        catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    });
}
exports.getAllCandidateBasedOnElectionName = getAllCandidateBasedOnElectionName;
function getAllCandidate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const candidates = yield candidate_1.default.find({});
            res.status(200).json({
                message: "Candidate successfully fetched",
                success: true,
                candidates,
            });
        }
        catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    });
}
exports.getAllCandidate = getAllCandidate;
