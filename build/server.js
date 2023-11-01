"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Test_1 = __importDefault(require("./routes/Test"));
const router = (0, express_1.default)();
// connect ke mongoose
mongoose_1.default
    .connect(config_1.config.mongo.url, { dbName: config_1.config.mongo.dbName })
    .then(() => {
    Logging_1.default.info('terkoneksi dengan mongodb');
    StartServer();
})
    .catch((error) => {
    Logging_1.default.error('tidak dapat konek ke mongodb');
    Logging_1.default.error(error);
});
// only start kalo sudah konek ke mongo
const StartServer = () => {
    router.use((req, res, next) => {
        // log requestnya
        Logging_1.default.info(`Incoming -> Method:[${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            // log responnya
            Logging_1.default.info(`Incoming -> Method:[${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Heades', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    // Routes
    router.use('/testWRA', Test_1.default);
    // Healthcheck
    router.get('/gow', (req, res, next) => res.status(200).json({ message: 'eeuuyyyyy' }));
    // error handling
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server jalan di port ${config_1.config.server.port}.`));
};
