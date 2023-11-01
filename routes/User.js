"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const router = express_1.default.Router();
router.post('/login', User_1.default.login);
router.post('/register', User_1.default.register);
router.get('/get/:userId', User_1.default.readUser);
router.get('/get', User_1.default.readAllUser);
router.patch('/update/:userId', User_1.default.updateUser);
router.delete('/delete/:userId', User_1.default.deleteUser);
module.exports = router;
