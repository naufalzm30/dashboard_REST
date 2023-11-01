"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const WRA_1 = __importDefault(require("../controllers/WRA"));
const router = express_1.default.Router();
router.post('/create', WRA_1.default.createWRA);
router.get('/get/:wraId', WRA_1.default.readWRA);
router.get('/getDefaultValue', WRA_1.default.readDefaultWRA);
router.get('/getGrafik/:WTId/:wraId/:minDate/:maxDate', WRA_1.default.readGrafikWRA);
router.get('/getStatistik/:WTId/:wraId/:minDate/:maxDate', WRA_1.default.readStatistikWRA);
router.get('/getStatistikAll/:WTId/:wraId/:minDate/:maxDate', WRA_1.default.readStatistikAllWRA);
router.get('/getDistribusi/:WTId/:wraId/:minDate/:maxDate', WRA_1.default.readDistribusiWRA);
module.exports = router;
