"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const app = (0, express_1.default)();
const port = 3000;
app.use(indexRoute_1.default);
app.listen(port, () => {
    console.log(`app start listening at port: ${port}`);
});
exports.default = app;
