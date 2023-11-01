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
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const createUser = (req: Request, res: Response, next: NextFunction) => {
//     const { username, password } = req.body;
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         username,
//         password
//     });
//     return user
//         .save()
//         .then((user) => res.status(200).json({ user }))
//         .catch((error) => res.status(500).json({ error }));
// };
const register = (req, res, next) => {
    const { username, email, role, password } = req.body;
    const user = new User_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        username,
        email,
        role,
        password
    });
    return user
        .save()
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, password } = req.body;
    // kalo mau return specific properties findById(userId, 'username,password')
    try {
        const foundUser = yield User_1.default.findOne({ username: username });
        if (!foundUser) {
            return res.status(404).json({ message: 'tidak ada akun' });
        }
        const isMatch = bcrypt_1.default.compareSync(password, foundUser.password);
        if (isMatch) {
            const token = jsonwebtoken_1.default.sign({ _id: (_a = foundUser._id) === null || _a === void 0 ? void 0 : _a.toString(), name: foundUser.username, email: foundUser.email, role: foundUser.role }, 'excalibur', {
                expiresIn: '1 days'
            });
            return res.status(200).json({ token: token });
            // res.status(200).json({ foundUser });
        }
        else {
            res.status(404).json({ message: 'tidak ada akun' });
        }
    }
    catch (error) {
        throw error;
    }
    console.log(username);
    // return User.findOne({ username: username, password: password })
    //     .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'tidak ada user' })))
    //     .catch((error) => res.status(500).json({ error }));
});
const readUser = (req, res, next) => {
    const userId = req.params.userId;
    // kalo mau return specific properties findById(userId, 'username,password')
    return User_1.default.findOne({ username: userId })
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'tidak ada akun' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllUser = (req, res, next) => {
    // kalo mau return specific properties find({}, 'username,password')
    return User_1.default.aggregate([
        {
            $project: { _id: 1, username: 1, email: 1, role: 1 }
        }
    ])
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};
const updateUser = (req, res, next) => {
    const userId = req.params.userId;
    return User_1.default.findOne({ username: userId })
        .then((user) => {
        if (user) {
            user.set(req.body);
            return user
                .save()
                .then((user) => res.status(200).json({ user }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'tidak ada akun' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    return User_1.default.findOneAndDelete({ username: userId })
        .then((user) => user
        ? res.status(201).json({
            message: 'akun dihapus'
        })
        : res.status(404).json({ message: 'tidak ada akun' }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { login, register, readUser, readAllUser, updateUser, deleteUser };
