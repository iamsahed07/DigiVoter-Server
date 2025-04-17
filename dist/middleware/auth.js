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
exports.isVerified = exports.adminMustAuth = exports.userMustAuth = void 0;
const variables_1 = require("../utils/variables");
const jsonwebtoken_1 = require("jsonwebtoken");
const admin_1 = __importDefault(require("../models/admin"));
const user_1 = __importDefault(require("../models/user"));
const helper_1 = require("../utils/helper");
const userMustAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const authorizationToken = authorization === null || authorization === void 0 ? void 0 : authorization.split("Bearer ")[1];
    if (!authorizationToken)
        return res.status(403).json({
            error: "Unauthorized request!!",
        });
    const payload = (0, jsonwebtoken_1.verify)(authorizationToken, variables_1.JWT_SECRET);
    const id = payload.userId;
    const user = yield user_1.default.findOne({ _id: id, tokens: authorizationToken });
    if (!user)
        return res.status(403).json({ error: "Unauthorized request!" });
    const age = (0, helper_1.calculateAge)(user.dob);
    req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified,
        adhar: user.adhar,
        state: user.state,
        role: user.role,
        dob: user.dob,
        voterId: user.voterId,
        mobile: user.mobile,
        address: user.address,
        constituency: user.constituency,
        imgUrl: user.imgUrl,
        age,
    };
    req.token = authorizationToken;
    next();
});
exports.userMustAuth = userMustAuth;
const adminMustAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    console.log(authorization);
    const authorizationToken = authorization === null || authorization === void 0 ? void 0 : authorization.split("Bearer ")[1];
    if (!authorizationToken)
        return res.status(403).json({
            error: "Unauthorized request!! Invalid Access token!!",
        });
    const payload = (0, jsonwebtoken_1.verify)(authorizationToken, variables_1.JWT_SECRET);
    const id = payload.adminId;
    const admin = yield admin_1.default.findOne({ _id: id });
    if (!admin)
        return res.status(403).json({ error: "Unauthorized request!" });
    req.token = authorizationToken;
    req.admin = {
        id: admin._id,
        role: "Admin",
        username: admin.username,
        email: admin.email,
    };
    next();
});
exports.adminMustAuth = adminMustAuth;
const isVerified = (req, res, next) => {
    if (!req.user.verified)
        return res.status(403).json({ error: "Please verify your email account!" });
    next();
};
exports.isVerified = isVerified;
