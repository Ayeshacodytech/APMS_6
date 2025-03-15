const express = require('express');
const router = express.Router();
const zod = require("zod");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware');
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

// Updated signupSchema
const signupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
    registernumber: zod.string().optional(),
    year: zod.string(),
    department: zod.string(),
    YearofGraduation: zod.string(),
    isPlaced: zod.boolean().optional(),
    FieldofInterest: zod.string(),
    placedCompany: zod.array(zod.string()).optional(),
    cgpa: zod.string().optional(),
    batch: zod.string()
});

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

router.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        console.log(body)
        const validation = signupSchema.safeParse(body);
        console.log(validation)
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues

            });
        }

        const existingUser = await prisma.student.findUnique({
            where: { email: body.email }
        });
        if (existingUser) {
            return res.status(409).json({
                message: "Email is already taken"
            });
        }

        const hashedPassword = await hashPassword(body.password);
        const user = await prisma.student.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                registernumber: body.registernumber,
                year: body.year,
                department: body.department,
                YearofGraduation: body.YearofGraduation,
                isPlaced: body.isPlaced ?? false,
                FieldofInterest: body.FieldofInterest,
                cgpa: body.cgpa,
                batch: body.batch

            }
        });
        const token = jwt.sign({ id: user.id, role: 'student' }, JWT_SECRET);
        return res.json({ id: user.id, token });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});

// Updated signinSchema
const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

async function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

router.post('/signin', async (req, res) => {
    try {
        const body = req.body;
        const validation = signinSchema.safeParse(body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }

        const user = await prisma.student.findUnique({
            where: { email: body.email }
        });
        if (!user || !(await verifyPassword(body.password, user.password))) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign({ id: user.id, role: 'student' }, JWT_SECRET);
        return res.json({ id: user.id, token });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});
const profileUpdateSchema = zod.object({
    name: zod.string().optional(),
    email: zod.string().email().optional(),
    registernumber: zod.string().optional(),
    year: zod.string().optional(),
    departmant: zod.string().optional(),
    YearofGraduation: zod.string().optional(),
    FieldofInterest: zod.string().optional(),
});

router.get('/profile', authMiddleware('student'), async (req, res) => {
    try {
        const profile = await prisma.student.findUnique({
            where: { id: req.userId }  // Access the user ID from req.user
        });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        return res.json(profile);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
})

router.put('/updateProfile', authMiddleware('student'), async (req, res) => {
    try {
        const body = req.body;
        const validation = profileUpdateSchema.safeParse(body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }

        if (body.password) {
            body.password = await hashPassword(body.password);
        }

        const updatedUser = await prisma.student.update({
            where: { id: req.userId },
            data: {
                name: body.name,
                email: body.email,
                registernumber: body.registernumber,
                year: body.year,
                departmant: body.departmant,
                batch:body.batch,
                cgpa:body.cgpa,
                YearofGraduation: body.YearofGraduation,
                FieldofInterest: body.FieldofInterest,
            }
        });
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});
const placementUpdateSchema = zod.object({
    isPlaced: zod.boolean().optional()
});

router.put('/updatePlacement', authMiddleware('student'), async (req, res) => {
    try {
        const body = req.body;
        const validation = placementUpdateSchema.safeParse(body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }

        const updatedUser = await prisma.student.update({
            where: { id: req.userId },
            data: {
                isPlaced: body.isPlaced
            }
        });
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});

const placedCompanySchema = zod.object({
    placedCompanyname: zod.string(),
    onCampus: zod.boolean().optional(),
    package: zod.string(),
    role: zod.string(),
});

router.post('/createPlacedCompany', authMiddleware('student'), async (req, res) => {
    try {
        const body = req.body;
        const validation = placedCompanySchema.safeParse(body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }

        const placedCompany = await prisma.placedCompany.create({
            data: {
                studentid: req.userId,
                placedCompanyname: body.placedCompanyname,
                onCampus: body.onCampus ?? true,
                package: body.package,
                role: body.role,
            }
        });
        return res.json(placedCompany);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});
const placedCompanyUpdateSchema = zod.object({
    placedCompanyname: zod.string().optional(),
    onCampus: zod.boolean().optional(),
    package: zod.string().optional(),
    role: zod.string().optional(),
});

router.put('/updatePlacedCompany/:id', authMiddleware('student'), async (req, res) => {
    try {
        const body = req.body
        const { id } = req.params;
        const validation = placedCompanyUpdateSchema.safeParse(body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }
        const updatedPlacedCompany = await prisma.placedCompany.update({
            where: { id: id },
            data: {
                studentid: req.userId,
                placedCompanyname: body.placedCompanyname,
                onCampus: body.onCampus,
                package: body.package,
                role: body.role,
            }
        });
        return res.json(updatedPlacedCompany);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});
router.get('/jobs', authMiddleware('student'), async (req, res) => {
    try {
        const currentJobs = await prisma.jobs.findMany({
            where: { status: 'current' }
        });

        const previousJobs = await prisma.jobs.findMany({
            where: { status: 'previous' }
        });

        return res.json({
            currentJobs,
            previousJobs
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});

module.exports = router;