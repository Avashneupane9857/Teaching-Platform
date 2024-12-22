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
exports.slideRoutes = void 0;
const express_1 = require("express");
const middleware_1 = require("../middlewares/middleware");
const prisma_1 = require("../prisma");
exports.slideRoutes = (0, express_1.Router)();
exports.slideRoutes.get("/:classId/slides", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classId } = req.params;
    try {
        const classData = yield prisma_1.prisma.class.findUnique({
            where: { id: parseInt(classId) },
            select: { slides: true },
        });
        if (!classData) {
            return res.status(404).json({ error: "Class not found" });
        }
        res.status(200).json(classData.slides);
    }
    catch (error) {
        console.error("Error fetching slides:", error);
        res.status(500).json({ error: "Failed to fetch slides" });
    }
}));
exports.slideRoutes.post("/upload", middleware_1.middleware, (req, res) => {
});
