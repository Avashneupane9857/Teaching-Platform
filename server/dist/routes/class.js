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
exports.classRoutes = void 0;
const express_1 = require("express");
const middleware_1 = require("../middlewares/middleware");
const prisma_1 = require("../prisma");
exports.classRoutes = (0, express_1.Router)();
exports.classRoutes.post("/create", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const userId = req.userId;
    const role = req.role;
    if (role !== "Teacher") {
        return res.status(403).json({ error: "Only teachers can create classes" });
    }
    try {
        const newClass = yield prisma_1.prisma.class.create({
            data: {
                title,
                teacherId: userId,
            },
        });
        res.status(201).json(newClass);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create class" });
    }
}));
exports.classRoutes.get("/", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classes = yield prisma_1.prisma.class.findMany({
            include: { teacher: true, students: true },
        });
        res.status(200).json(classes);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch classes" });
    }
}));
exports.classRoutes.post("/join/:classId", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classId } = req.params;
    const userId = req.userId;
    const role = req.role;
    if (role !== "Student") {
        return res.status(403).json({ error: "Only students can join classes" });
    }
    try {
        yield prisma_1.prisma.class.update({
            where: { id: parseInt(classId) },
            data: { students: { connect: { id: userId } } },
        });
        res.status(200).json({ message: "Successfully joined the class" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to join class maybe class id is wrong" });
    }
}));
