import { Router } from "express";
import { middleware } from "../middlewares/middleware";
import { prisma } from "../prisma";

export const classRoutes=Router()
classRoutes.post("/create",middleware,async(req:any,res:any)=>{
const {title}=req.body;
const userId=   req.userId

const role=req.role
if(role !== "Teacher"){
    return res.status(403).json({ error: "Only teachers can create classes" });
}

try {
    const newClass = await prisma.class.create({
      data: {
        title,
        teacherId: userId,
      },
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: "Failed to create class" });
  }
});


classRoutes.get("/", middleware, async (req, res) => {
    try {
      const classes = await prisma.class.findMany({
        include: { teacher: true, students: true },
      });
      res.status(200).json(classes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch classes" });
    }
  });

  classRoutes.post("/join/:classId", middleware, async (req:any, res:any) => {
    const { classId } = req.params;
    const userId = req.userId;
    const role=req.role;
  
    if (role !== "Student") {
      return res.status(403).json({ error: "Only students can join classes" });
    }
  
    try {
      await prisma.class.update({
        where: { id: parseInt(classId) },
        data: { students: { connect: { id: userId } } },
      });
      res.status(200).json({ message: "Successfully joined the class" });
    } catch (error) {
      res.status(500).json({ error: "Failed to join class maybe class id is wrong" });
    }
  });