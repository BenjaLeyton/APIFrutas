"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./models/db"));
const endpoints_1 = __importDefault(require("./routes/endpoints"));
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, db_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', endpoints_1.default);
app.use((err, req, res, next) => {
    (0, errorHandler_1.handleError)(err, res);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
