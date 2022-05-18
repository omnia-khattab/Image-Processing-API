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
const path_1 = __importDefault(require("path"));
const resize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.name;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const img_path = `./assets/images/full/${image}.jpg`;
    const resize_path = `./assets/images/output/${image}_${width}_${height}.jpeg`;
    //chech if there's an exact image with the same properties
    if ((0, node_fs_1.existsSync)(resize_path)) {
        const img = yield fs_1.promises.readFile(resize_path).catch(() => {
            res.status(500).send('Error occured while processing the image');
        });
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
    //checking if the image exist in the folder
    const dir_path = path_1.default.resolve(__dirname, `../../assets/images/full/${image}.jpg`);
    const imageNameExist = yield fs_1.promises.stat(dir_path).catch(() => {
        //res.status(404).send('Image resource not found');
        return;
    });
    if (Object.keys(req.query).length === 0) {
        res.send('');
        return;
    }
    else if (image === undefined || image === ' ' || !imageNameExist) {
        res.status(404).send('Image resource not found');
    }
    else if (width < 10 || isNaN(width)) {
        res.status(400).send('width must be exist and more than 10');
    }
    else if (height < 10 || isNaN(height)) {
        res.status(400).send('height must be exist and more than 10');
    }
    else {
        next();
    }
    /*console.log(imageNameExist);

    if(!imageNameExist){
        return;
    }*/
});
exports.validation = validation;
