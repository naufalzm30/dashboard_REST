"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Test_1 = __importDefault(require("../controllers/Test"));
const router = express_1.default.Router();
router.post('/create', Test_1.default.createTest);
router.get('/get/:testId', Test_1.default.readTest);
router.get('/get', Test_1.default.readAllTest);
router.patch('/update/:testId', Test_1.default.updateTest);
router.delete('/delete/:testId', Test_1.default.deleteTest);
module.exports = router;
