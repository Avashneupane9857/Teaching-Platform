import express from "express";
import cors from "cors"
import { authRoutes } from "./routes/auth";
import { classRoutes } from "./routes/class";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/classes", classRoutes);

export default app;