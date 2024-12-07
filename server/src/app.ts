import express from "express";
import cors from "cors"
import { authRoutes } from "./routes/auth";
import { classRoutes } from "./routes/class";
import * as dotenv from 'dotenv';
dotenv.config();    
const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/classes", classRoutes);


const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;