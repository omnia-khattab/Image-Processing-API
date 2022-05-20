"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.validation = exports.resize = exports.resizeMiddleware = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const node_fs_1 = require("node:fs");
const path_1 = __importStar(require("path"));
const assert_1 = require("assert");
const resizeMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.name;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const resize_path = path_1.default.resolve(__dirname, `./../../assets/images/output/${image}_${width}_${height}.jpeg`);
    //chech if there's an exact image with the same properties
    if ((0, node_fs_1.existsSync)(resize_path)) {
        const img = yield fs_1.promises.readFile(resize_path).catch(() => {
            res.status(500).send('Error occured while processing the image from middleware function');
            return;
        });
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(img, 'binary');
        return;
    }
    else {
        try {
            resize(image, width, height);
            next();
        }
        catch (error) {
            res.status(500).send(error + 'From try & catch in Middleware');
        }
    }
});
exports.resizeMiddleware = resizeMiddleware;
const resize = (image, width, height) => {
    const img_path = path_1.default.resolve(__dirname, `./../../assets/images/full/${image}.jpg`);
    const resize_path = path_1.default.resolve(__dirname, `./../../assets/images/output/${image}_${width}_${height}.jpeg`);
    (0, sharp_1.default)(img_path)
        .resize(width, height)
        .toFile(resize_path)
        .then((res) => {
        console.log('Done!', res);
        (0, path_1.resolve)(resize_path);
    })
        .catch((err) => {
        console.error("Error processing files, let's clean it up", err);
        (0, assert_1.rejects)(err);
    });
};
exports.resize = resize;
const validation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.name;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    //checking if the image exist in the folder
    const dir_path = path_1.default.resolve(__dirname, `../../assets/images/full/${image}.jpg`);
    const imageNameExist = yield fs_1.promises
        .stat(dir_path)
        .catch(() => {
        //res.status(404).send('Image resource not found');
        return null;
    });
    if (Object.keys(req.query).length === 0) {
        res.send('');
        return;
    }
    else if (image === undefined || image === ' ' || !imageNameExist) {
        res.status(404).send('Image resource not found');
        return;
    }
    else if (width < 10 || isNaN(width)) {
        res.status(400).send('width must be exist and more than 10');
        return;
    }
    else if (height < 10 || isNaN(height)) {
        res.status(400).send('height must be exist and more than 10');
        return;
    }
    else {
        next();
    }
});
exports.validation = validation;
