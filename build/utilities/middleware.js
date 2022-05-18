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
exports.validation = exports.resize = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const node_fs_1 = require("node:fs");
const resize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.name;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const img_path = `./assets/images/full/${image}.jpg`;
    const resize_path = `./assets/images/output/${image}_${width}_${height}.jpeg`;
    //chech if there's an exact image
    if ((0, node_fs_1.existsSync)(resize_path)) {
        const img = yield fs_1.promises.readFile(resize_path);
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(img, 'binary');
    }
    else {
        yield (0, sharp_1.default)(img_path).resize(width, height).toFile(resize_path);
        next();
    }
});
exports.resize = resize;
const validation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.name;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (Object.keys(req.query).length === 0) {
        res.send('add image properties to resize it');
        //res.redirect('/api/images');
        return;
    }
    else if (image === undefined || image === ' ') {
        res.status(404).send('Image resource not find');
    }
    else if (width < 10) {
        res.status(400).send("width shouldn't be less than 10");
    }
    else if (height < 10) {
        res.status(400).send("height shouldn't be less than 10");
    }
    else {
        next();
    }
});
exports.validation = validation;
