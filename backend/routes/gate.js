const express = require('express');
const router = express.Router();
const zod = require("zod");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware');
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

router.get("/mcqs", authMiddleware('student'), async (req, res) => {
    try {
        const studentId = req.userId;

        const mcqs = await prisma.gatemcq.findMany();

        // Fetch all attempts for the student
        const attempts = await prisma.gatemcqAttempt.findMany({
            where: { studentId },
            select: { gatemcqId: true },
        });

        const attemptedMCQs = new Set(attempts.map((a) => a.gatemcqId));

        const mcqWithStatus = mcqs.map((mcq) => ({
            ...mcq,
            attempted: attemptedMCQs.has(mcq.id),
        }));

        res.json(mcqWithStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/mcqs/:id", authMiddleware('student'), async (req, res) => {
    try {
        const studentId = req.userId; // Ensure your auth middleware sets this correctly
        const mcqId = req.params.id;

        // Fetch the specific MCQ by its id
        const mcq = await prisma.gatemcq.findUnique({
            where: { id: mcqId },
        });

        if (!mcq) {
            return res.status(404).json({ error: "MCQ not found" });
        }

        // Check if the student has attempted this specific MCQ
        const attempt = await prisma.gatemcqAttempt.findFirst({
            where: {
                studentId,
                gatemcqId,
            },
            select: { gatemcqId: true },
        });

        const attempted = attempt ? true : false;

        // Attach the attempted status to the MCQ object
        const mcqWithStatus = { ...mcq, attempted };

        res.json(mcqWithStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/mcqs/:id/attempt", authMiddleware("student"), async (req, res) => {
    try {
        const { id } = req.params;
        const { selectedOption } = req.body;
        const studentId = req.userId;
        const mcq = await prisma.gatemcq.findUnique({
            where: { id },
        });

        if (!mcq) {
            return res.status(404).json({ message: "MCQ not found" });
        }

        const existingAttempt = await prisma.gatemcqAttempt.findFirst({
            where: { studentId, gatemcqId: id },
        });

        if (existingAttempt) {
            return res.status(400).json({ message: "You have already attempted this MCQ" });
        }
        const isCorrect = mcq.answer === selectedOption;

        await prisma.gatemcqAttempt.create({
            data: {
                studentId,
                gatemcqId: id,
                isCorrect
            },
        });

        if (isCorrect) {
            return res.json({
                message: "Correct Answer!",
                isCorrect: true,
            });
        } else {
            return res.json({
                message: "Incorrect Answer!",
                isCorrect: false,
                correctAnswer: mcq.answer,
                explanation: mcq.explanation,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const resourceSchema = zod.object({
    topic: zod.string().min(3, "Topic must be at least 3 characters"),
    resource: zod.string().min(3,"Resource must be at least 3 characters"),
    tags: zod.string().optional(),
});

router.post("/resources", authMiddleware("student"), async (req, res) => {
    try {
        const validatedData = resourceSchema.parse(req.body);
        const studentId = req.userId;
        const role = req.userRole;

        // Create a new resource
        const newResource = await prisma.gateresource.create({
            data: {
                topic: validatedData.topic,
                resource: validatedData.resource,
                tags: validatedData.tags,
                addedByStudentId: studentId,
                addedByType: role,
            },
        });

        res.status(201).json({ message: "Resource added successfully", newResource });
    } catch (error) {
        // Handling Unique Constraint Error
        if (error.code === "P2002") {
            return res.status(400).json({ message: "Resource already exists" });
        }

        if (error instanceof zod.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }

        res.status(500).json({ error: error.message });
    }
});

router.get("/resources", authMiddleware("student"), async (req, res) => {
    try {
        const resources = await prisma.gateresource.findMany({
            orderBy: { createdAt: "desc" }, // Latest resources first
        });

        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/resources/:id", authMiddleware("student"), async (req, res) => {
    try {
        const { id } = req.params;

        const resource = await prisma.gateresource.findUnique({
            where: { id },
        });

        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/myresources", authMiddleware("student"), async (req, res) => {
    try {
        const studentId = req.userId;

        const resources = await prisma.gateresource.findMany({
            where: { addedByStudentId: studentId },
        });

        if (!resources || resources.length === 0) {
            return res.status(200).json({ message: "No resources found", resources: [] });
        }

        res.json(resources);
    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.delete("/resources/:id", authMiddleware("student"), async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.userId; // Get authenticated student's ID

        // Check if the resource exists and belongs to the student
        const resource = await prisma.gateresource.findFirst({
            where: { id, addedByStudentId: studentId },
        });

        if (!resource) {
            return res.status(404).json({ message: "Resource not found or you don't have permission to delete it" });
        }

        // Delete the resource
        await prisma.gateresource.delete({
            where: { id },
        });

        res.json({ message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;
