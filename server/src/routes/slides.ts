import { Router } from "express";
import { middleware } from "../middlewares/middleware";
import { prisma } from "../prisma";

export const slideRoutes=Router();

slideRoutes.get("/:classId/slides", middleware, async (req:any, res:any) => {
    const { classId } = req.params;
  
    try {
      const classData = await prisma.class.findUnique({
        where: { id: parseInt(classId) },
        select: { slides: true },
      });
  
      if (!classData) {
        return res.status(404).json({ error: "Class not found" });
      }
  
      res.status(200).json(classData.slides);
    } catch (error) {
      console.error("Error fetching slides:", error);
      res.status(500).json({ error: "Failed to fetch slides" });
    }
  });
  

slideRoutes.post("/upload",middleware,(req:any,res:any)=>{
    
})