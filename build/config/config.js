"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = 'mongodb://127.0.0.1:27017/';
// `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@weblantang.ynw3mpv.mongodb.net/`
// 'mongodb://localhost:27017/lantang_nirwana';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
exports.config = {
    mongo: {
        url: MONGO_URL,
        dbName: 'dbWRA'
    },
    server: {
        port: SERVER_PORT
    }
};
