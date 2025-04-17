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
exports.sendMailVote = exports.isVoted = exports.giveVote = void 0;
const givenVote_1 = __importDefault(require("../models/givenVote"));
const helper_1 = require("../utils/helper");
const user_1 = __importDefault(require("../models/user"));
const emailVerificationToken_1 = __importDefault(require("../models/emailVerificationToken"));
const mail_1 = require("../utils/mail");
const candidate_1 = __importDefault(require("../models/candidate"));
const giveVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { candidateId, electionId, token } = req.body;
        const verificationToken = yield emailVerificationToken_1.default.findOne({
            owner: id,
        });
        if (!verificationToken)
            return res.status(403).json({ error: "Invalid Varification token!", success: false });
        const matched = yield verificationToken.compareToken(token);
        if (!matched)
            return res.status(403).json({ error: "Invalid token!", success: false });
        yield emailVerificationToken_1.default.findByIdAndDelete(verificationToken._id);
        const isVoted = yield givenVote_1.default.findOne({ voterRef: id });
        if (isVoted) {
            return res
                .status(200)
                .json({ error: "Vote was already given by this Id!!", success: false });
        }
        const candidate = yield candidate_1.default.findOne({ _id: candidateId });
        if (candidate) {
            candidate.votes += 1;
            yield candidate.save();
            const givenVote = new givenVote_1.default({
                electionRef: electionId,
                voterRef: id,
            });
            yield givenVote.save();
        }
        else {
            res
                .status(400)
                .json({ error: "candidate was not found!!", success: false });
        }
        res
            .status(200)
            .json({ message: "vote has been given sucessfully!!", success: true });
    }
    catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
});
exports.giveVote = giveVote;
const isVoted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { electionId } = req.body;
        const isVoted = yield givenVote_1.default.findOne({ voterRef: id, electionRef: electionId });
        if (isVoted) {
            return res
                .status(200)
                .json({
                message: "Vote was already given by the voter Id!!",
                isVoted: true,
                success: true,
            });
        }
        res.status(200).json({
            message: "No Vote is given by  by the voter Id!!",
            isVoted: false,
            success: true,
        });
    }
    catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
});
exports.isVoted = isVoted;
const sendMailVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    const { adhar } = req.body;
    user = yield user_1.default.findOne({ adhar });
    if (!user)
        return res
            .status(403)
            .json({ error: "Invalid request!! User not exists!!" });
    yield emailVerificationToken_1.default.findOneAndDelete({
        owner: user._id,
    });
    const token = (0, helper_1.generateToken)();
    yield emailVerificationToken_1.default.create({
        owner: user._id,
        token,
    });
    (0, mail_1.sendOTPForVoteMail)(token, {
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        userId: user === null || user === void 0 ? void 0 : user._id.toString(),
    });
    res.json({ message: "An OTP send to your registered mail." });
});
exports.sendMailVote = sendMailVote;
