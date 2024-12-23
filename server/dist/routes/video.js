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
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRoutes = void 0;
const express_1 = require("express");
const livekit_server_sdk_1 = require("livekit-server-sdk");
exports.videoRoutes = (0, express_1.Router)();
const createToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const roomName = "avashRoom";
    const participantName = "Suksham";
    const at = new livekit_server_sdk_1.AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
        identity: participantName
    });
    const videoGrant = {
        room: roomName,
        roomJoin: true
    };
    at.addGrant(videoGrant);
    const token = yield at.toJwt();
    return token;
});
exports.videoRoutes.get('/getToken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield createToken());
    res.status(200).json({ msg: yield createToken() });
}));
