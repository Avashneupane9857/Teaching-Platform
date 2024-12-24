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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slidesRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const middleware_1 = require("../middlewares/middleware");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const client_s3_1 = require("@aws-sdk/client-s3");
const prisma_1 = require("../prisma");
const node_stream_1 = require("node:stream");
dotenv_1.default.config();
exports.slidesRoutes = (0, express_1.Router)();
console.log('AWS Region:', process.env.AWS_REGION);
console.log('Bucket Name:', process.env.S3_BUCKET_NAME);
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (_, file, cb) => {
        if (file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only PDF and PPTX files are allowed.'));
        }
    }
});
exports.slidesRoutes.post("/:classId", upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId } = req.params;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const slideId = (0, uuid_1.v4)();
        const s3Key = `slides/${classId}/${slideId}-${file.originalname}`;
        yield s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype,
        }));
        const slide = yield prisma_1.prisma.slide.create({
            data: {
                filename: file.originalname,
                s3Key,
                classId: parseInt(classId),
                totalSlides: 1,
                currentPage: 1
            }
        });
        res.status(201).json(slide);
    }
    catch (error) {
        console.error('Error uploading slide:', error);
        res.status(500).json({ error: 'Failed to upload slide' });
    }
}));
exports.slidesRoutes.get('/:classId/:slideId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId, slideId } = req.params;
        const slide = yield prisma_1.prisma.slide.findFirst({
            where: {
                id: parseInt(slideId),
                classId: parseInt(classId)
            }
        });
        if (!slide) {
            return res.status(404).json({ error: 'Slide not found' });
        }
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: slide.s3Key,
        });
        const response = yield s3Client.send(command);
        if (!response.Body) {
            return res.status(404).json({ error: 'Slide not found in S3' });
        }
        // Set the correct headers
        res.set('Content-Type', response.ContentType);
        res.set('Content-Length', response.ContentLength);
        // Convert the response body to a readable stream
        const stream = node_stream_1.Readable.from(yield response.Body.transformToByteArray());
        // Pipe the stream to the response
        stream.pipe(res);
    }
    catch (error) {
        console.error('Error fetching slide:', error);
        res.status(500).json({ error: 'Failed to fetch slide' });
    }
}));
exports.slidesRoutes.delete('/:classId/:slideId', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId, slideId } = req.params;
        const slide = yield prisma_1.prisma.slide.findFirst({
            where: {
                id: parseInt(slideId),
                classId: parseInt(classId)
            }
        });
        if (!slide) {
            return res.status(404).json({ error: 'Slide not found' });
        }
        yield s3Client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: slide.s3Key,
        }));
        yield prisma_1.prisma.slide.delete({
            where: {
                id: parseInt(slideId)
            }
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting slide:', error);
        res.status(500).json({ error: 'Failed to delete slide' });
    }
}));
