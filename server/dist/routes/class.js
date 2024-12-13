"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRoutes = void 0;
const express_1 = require("express");
const middleware_1 = require("../middlewares/middleware");
exports.classRoutes = (0, express_1.Router)();
exports.classRoutes.post("/:id", middleware_1.middleware, (req, res) => {
});
