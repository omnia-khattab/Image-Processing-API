"use strict";
//import images from './api/images';
//const resize_path = `./assets/images/output/resizedImage.jpg`;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./../utilities/middleware");
const images_1 = __importDefault(require("./api/images"));
const routes = express_1.default.Router();
routes.use('/api/images', middleware_1.validation, middleware_1.resize, images_1.default);
routes.get('/', (req, res) => {
    res.send('HEllo From Main Route');
});
exports.default = routes;
/*routes.get('/api/images', resize, async(req,res)=>{
        await fsPromises.readFile(resize_path, function (err, data) {
        if (err) new Error("can't send file");
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(data);
        });
    /*const body = '<h1>hello world<>h1';
    res.writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain'
    })
    res.write(body)
    res.end();
});*/
