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
// interface videoProps{
//     classId:string,
//     username:string
// }
const createToken = () => __awaiter(void 0, void 0, void 0, function* () {
    // const createToken=async({classId, username}:videoProps)=>{
    const classIds = "avashRoom";
    const usernames = "Suksham";
    const at = new livekit_server_sdk_1.AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
        identity: usernames
    });
    const videoGrant = {
        room: classIds,
        roomJoin: true
    };
    at.addGrant(videoGrant);
    const token = yield at.toJwt();
    return token;
});
exports.videoRoutes.get("/getToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   const { classId,username } = req.query; 
    //   if (!classId || !username) {
    //     return res.status(400).json({ error: "classId and userId are required" });
    //   }
    //   const token = await createToken({classId, username});
    const token = yield createToken();
    res.status(200).json({ token });
    // } catch (error) {
    //   console.error("Error generating token:", error);
    //   res.status(500).json({ error: "Failed to generate token" });
    // }
}));
