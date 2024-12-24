import express from "express";
import cors from "cors"
import { authRoutes } from "./routes/auth";
import { classRoutes } from "./routes/class";
import * as dotenv from 'dotenv'
import { videoRoutes } from "./routes/video";
import { slidesRoutes } from "./routes/slides";
dotenv.config();    
const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/class", classRoutes);
app.use("/slides",slidesRoutes)
app.use("/video",videoRoutes)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;