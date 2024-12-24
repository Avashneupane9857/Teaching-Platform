import { Router } from "express";
import multer from "multer";
import { middleware } from "../middlewares/middleware";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv"
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { prisma } from "../prisma";
dotenv.config();

export const slidesRoutes=Router()

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and PPTX files are allowed.'));
    }
  }
});


slidesRoutes.post("/:classId/slides",middleware, upload.single('slide'),async(req:any,res:any)=>{
  try {
    const { classId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const slideId = uuidv4();
    const s3Key = `slides/${classId}/${slideId}-${file.originalname}`;

    await S3Client.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: s3Key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));
    const slide = await prisma.slide.create({
      data: {
        filename: file.originalname,
        s3Key,
        classId: parseInt(classId),
     
        totalSlides: 1,
        currentPage: 1
      }
    });

    res.status(201).json(slide);
  } catch (error) {
    console.error('Error uploading slide:', error);
    res.status(500).json({ error: 'Failed to upload slide' });
  }
})





slidesRoutes.get('/:classId/slides/:slideId', async (req:any, res:any) => {
  try {
    const { classId, slideId } = req.params;

    const slide = await prisma.slide.findFirst({
      where: {
        id: parseInt(slideId),
        classId: parseInt(classId)
      }
    });

    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: slide.s3Key,
    });

    const response = await s3Client.send(command);
    
    if (!response.Body) {
      return res.status(404).json({ error: 'Slide not found in S3' });
    }

    response.Body.pipe(res);
  } catch (error) {
    console.error('Error fetching slide:', error);
    res.status(500).json({ error: 'Failed to fetch slide' });
  }
});




slidesRoutes.delete('/:classId/slides/:slideId', 
  middleware,
  async (req:any, res:any) => {
    try {
      const { classId, slideId } = req.params;

      const slide = await prisma.slide.findFirst({
        where: {
          id: parseInt(slideId),
          classId: parseInt(classId)
        }
      });

      if (!slide) {
        return res.status(404).json({ error: 'Slide not found' });
      }

      // Delete from S3
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: slide.s3Key,
      }));

      // Delete from database
      await prisma.slide.delete({
        where: {
          id: parseInt(slideId)
        }
      });

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting slide:', error);
      res.status(500).json({ error: 'Failed to delete slide' });
    }
});