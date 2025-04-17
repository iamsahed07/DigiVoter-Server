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
exports.sendOTPForVoteMail = exports.sendVerificationMail = void 0;
const template_1 = require("../mail/template");
const variables_1 = require("./variables");
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateMailTransporter = () => {
    var transport = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: variables_1.APP_USER,
            pass: variables_1.APP_PASS,
        },
    });
    return transport;
};
const sendVerificationMail = (token, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, userId } = profile;
    const welcomeMessage = `Hi ${name}, welcome to Voting Platform! There are so much thing that we do for verified users. Use the given OTP to verify your email.`;
    const transport = generateMailTransporter();
    transport.sendMail({
        to: email,
        from: {
            name: "DigiVoter",
            address: variables_1.APP_USER,
        },
        subject: "Welcome message",
        html: (0, template_1.generateTemplate)({
            title: "Welcome to Voting Platform",
            message: welcomeMessage,
            btnTitle: token,
        }),
    });
});
exports.sendVerificationMail = sendVerificationMail;
const sendOTPForVoteMail = (token, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = profile;
    const welcomeMessage = `Hi ${name}. Use the given OTP to give a vote.`;
    const transport = generateMailTransporter();
    transport.sendMail({
        to: email,
        from: {
            name: "DigiVoter",
            address: variables_1.APP_USER,
        },
        subject: "Welcome message",
        html: (0, template_1.generateTemplate)({
            title: "Welcome to Voting Platform",
            message: welcomeMessage,
            btnTitle: token,
        }),
    });
});
exports.sendOTPForVoteMail = sendOTPForVoteMail;
