"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401); // Unauthorized
    }
};
exports.authenticateJWT = authenticateJWT;
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.is_admin) {
        next();
    }
    else {
        res.status(403).json({ message: "Admins only" });
    }
};
exports.isAdmin = isAdmin;
