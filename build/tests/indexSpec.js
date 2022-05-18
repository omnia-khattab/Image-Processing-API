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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = require("fs");
const request = (0, supertest_1.default)(index_1.default);
describe('End Point Test Response', () => {
    it('Get The Home End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
});
describe('End Point Test Response', () => {
    it('Get The Api/Images End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.status).toBe(200);
    }));
});
describe('End Point Test For Image ', () => {
    it('Get The Api/Images? name & width & height End Point', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?name=image2&width=400&height=200');
        expect(response.status).toBe(200);
    }));
    it('Resized Image should be exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get('/api/images?name=image2&width=400&height=200')
            .then(() => {
            fs_1.promises
                .stat('../../assets/images/output/image2_400_200.jpeg')
                .then((fileStat) => expect(fileStat).not.toBeNull());
        });
    }));
    it('the desired image to resize must be exist in full directory', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get('/api/images?name=image2&width=400&height=200')
            .then(() => {
            fs_1.promises
                .stat('../../assets/images/full/image2.jpg')
                .then((fileStat) => expect(fileStat).not.toBeNull());
        });
    }));
});
