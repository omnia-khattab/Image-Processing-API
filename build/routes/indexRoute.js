"use strict";
//import images from './api/images';
//const resize_path = `./assets/images/output/resizedImage.jpg`;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { resize, validation } from './../utilities/middleware';
const images_1 = __importDefault(require("./api/images"));
const routes = express_1.default.Router();
routes.use(images_1.default);
routes.get('/', (req, res) => {
    res.send('HEllo From Main Route');
});
exports.default = routes;
