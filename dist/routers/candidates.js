"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const candidate_1 = require("../controllars/candidate");
const auth_1 = require("../middleware/auth");
const fileParser_1 = require("../middleware/fileParser");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/add-candidate", auth_1.adminMustAuth, fileParser_1.fileParser, candidate_1.addCandidate);
router.get("/get-all-candidate", candidate_1.getAllCandidate);
router.post("/get-based-on-constituency", auth_1.userMustAuth, candidate_1.getAllCandidateBasedOnConstituency);
router.post("/get-based-on-state", auth_1.userMustAuth, candidate_1.getAllCandidateBasedOnState);
router.post("/get-based-on-electionName", auth_1.userMustAuth, candidate_1.getAllCandidateBasedOnElectionName);
router.post("/admin-get-based-on-constituency", auth_1.adminMustAuth, candidate_1.getAllCandidateBasedOnConstituency);
router.post("/admin-get-based-on-state", auth_1.adminMustAuth, candidate_1.getAllCandidateBasedOnState);
router.post("/admin-get-based-on-electionName", auth_1.adminMustAuth, candidate_1.getAllCandidateBasedOnElectionName);
exports.default = router;
