import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

const JWT_SECRET = process.env.JWT_SECRET as string || "Saibaba9857";

export const authRoutes = Router();

authRoutes.post("/signup", async (req, res) => {
    const { username, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
    
      const user = await prisma.user.create({
        data: { username, password: hashedPassword, role },
      });
  
      res.status(200).json({ message: "User created", user });

    } catch (error) {

console.log(error)
      res.status(400).json({ error: "User already exists" });

    }
  });

  authRoutes.post("/signin", async (req:any, res:any) => {
    const { username, password } = req.body;
 
    try {
      const user = await prisma.user.findUnique({ where: { username } });
     
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  
  export default authRoutes;


