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
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@ac-6o0c4ha-shard-00-00.z9kzcz8.mongodb.net:27017,ac-6o0c4ha-shard-00-01.z9kzcz8.mongodb.net:27017,ac-6o0c4ha-shard-00-02.z9kzcz8.mongodb.net:27017/?ssl=true&replicaSet=atlas-n2b4gd-shard-0&authSource=admin&retryWrites=true&w=majority`;
// `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@wracluster.z9kzcz8.mongodb.net/`
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
