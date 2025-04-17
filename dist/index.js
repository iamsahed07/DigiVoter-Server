"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
require("./db/dbConfig");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 8000;
const auth_1 = __importDefault(require("./routers/auth"));
const elections_1 = __importDefault(require("./routers/elections"));
const candidates_1 = __importDefault(require("./routers/candidates"));
const vote_1 = __importDefault(require("./routers/vote"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('src/public'));
app.use("/auth", auth_1.default);
app.use("/elections", elections_1.default);
app.use("/candidates", candidates_1.default);
app.use("/vote", vote_1.default);
app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
