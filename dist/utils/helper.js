"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAge = exports.formatProfile = exports.generateToken = void 0;
const generateToken = (length = 6) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * 10);
        otp += digit;
    }
    return otp;
};
exports.generateToken = generateToken;
const formatProfile = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified,
        adhar: user.adhar,
        state: user.state,
        constituency: user.constituency,
        role: user.role,
        dob: user.dob,
        voterId: user.voterId,
        mobile: user.mobile,
        address: user.address,
        gender: user.gender,
    };
};
exports.formatProfile = formatProfile;
const calculateAge = function (dob) {
    const dobDate = new Date(dob);
    const now = new Date();
    const dobYear = dobDate.getFullYear();
    const nowYear = now.getFullYear();
    let age = (nowYear - dobYear);
    const dobMonth = dobDate.getMonth();
    const nowMonth = now.getMonth();
    const dobDay = dobDate.getDate();
    const nowDay = now.getDate();
    if (nowMonth < dobMonth || (nowMonth === dobMonth && nowDay < dobDay)) {
        age--;
    }
    return age;
};
exports.calculateAge = calculateAge;
