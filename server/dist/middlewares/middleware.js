"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware = (req, res, next) => {
    const secret = process.env.JWT_SECRET || "Saibaba9857";
    if (!secret) {
        res.status(400).json({ msg: "No secret provided" });
        return;
    }
    try {
        const bearer = req.headers["authorization"];
        if (!bearer) {
            return res.status(403).json({
                msg: "No authorization header found"
            });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(403).json({
                msg: "No token provided"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log("Decoded token:", decoded);
        req.userId = decoded.userId;
        req.role = decoded.role;
        console.log(req.userId);
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(403).json({ msg: "Invalid token" });
        }
        return res.status(500).json({ msg: "Internal server error" });
    }
};
exports.middleware = middleware;
