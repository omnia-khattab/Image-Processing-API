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
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const middleware_1 = require("./../../utilities/middleware");
const path_1 = __importDefault(require("path"));
const images = express_1.default.Router();
images.get('/api/images', middleware_1.validation, middleware_1.resizeMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.name;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const resize_path = path_1.default.resolve(__dirname, `./../../../assets/images/output/${image}_${width}_${height}.jpeg`);
    const img = yield fs_1.promises.readFile(resize_path).catch((error) => {
        res.status(500).send({
            message: error.message,
            resize_path: resize_path,
        });
        return;
    });
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');
}));
exports.default = images;
