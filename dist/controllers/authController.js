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
exports.signinUser = exports.signupUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const result = yield db_1.default.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, email]);
        res.status(201).json({ message: 'User signup', user: result.rows[0] });
    }
    catch (err) {
        res.status(500).json({ message: 'Error signup user', error: err });
    }
});
exports.signupUser = signupUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const result = yield db_1.default.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const isValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isValid)
            return res.status(401).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user.id, is_admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Sign in', token });
    }
    catch (err) {
        res.status(500).json({ message: 'Sign in error', error: err });
    }
});
exports.signinUser = signinUser;
