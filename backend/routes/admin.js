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
async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
const adminSignupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

router.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        const validation = adminSignupSchema.safeParse(body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }

        const existingAdmin = await prisma.admin.findFirst({
            where: { email: body.email }
        });
        if (existingAdmin) {
            return res.status(409).json({
                message: "Email is already taken"
            });
        }

        const hashedPassword = await hashPassword(body.password);
        const admin = await prisma.admin.create({
            data: {
                email: body.email,
                password: hashedPassword,
            }
        });
        const token = jwt.sign({ id: admin.id, role: 'admin' }, JWT_SECRET);
        return res.json({ id: admin.id, token });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});
const adminSigninSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});
async function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}
router.post('/signin', async (req, res) => {
    try {
        const body = req.body;
        const validation = adminSigninSchema.safeParse(body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }

        const admin = await prisma.admin.findFirst({
            where: { email: body.email }
        });
        if (!admin || !(await verifyPassword(body.password, admin.password))) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign({ id: admin.id, role: 'admin' }, JWT_SECRET);
        return res.json({ adminId: admin.id, token });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});
const jobSchema = zod.object({
    CompanyName: zod.string(),
    role: zod.string(),
    package: zod.string(),
    jobdescription: zod.string(),
    Type: zod.string(),
    eligibility: zod.string(),
    departmant: zod.any(),
    applylink: zod.string().url(),
    deadline: zod.string().refine((str) => !isNaN(Date.parse(str)), {
        message: "Invalid date format for deadline",
    }).transform((str) => new Date(str)),
    companyvisit: zod.string().refine((str) => !isNaN(Date.parse(str)), {
        message: "Invalid date format for companyvisit",
    }).transform((str) => new Date(str)),
    status: zod.string().optional(),
});
;



router.post('/addJob', authMiddleware('admin'), async (req, res) => {
    try {
        const body = req.body;
        const validation = jobSchema.safeParse(body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }

        const job = await prisma.jobs.create({
            data: {
                CompanyName: body.CompanyName,
                role: body.role,
                package: body.package,
                jobdescription: body.jobdescription,
                Type: body.Type,
                eligibility: body.eligibility,
                departmant: body.departmant,
                applylink: body.applylink,
                deadline: validation.data.deadline,
                companyvisit: validation.data.companyvisit,
                status: body.status ?? "current",
            }
        });
        return res.json(job);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});


const jobUpdateSchema = zod.object({
    CompanyName: zod.string().optional(),
    role: zod.string().optional(),
    package: zod.string().optional(),
    jobdescription: zod.string().optional(),
    Type: zod.string().optional(),
    eligibility: zod.string().optional(),
    departmant: zod.any().optional(),
    applylink: zod.string().url().optional(),
    deadline: zod.string().transform((str) => new Date(str)),
    companyvisit: zod.string().transform((str) => new Date(str)),
    status: zod.string().optional(),
});

router.put('/updateJob/:id',authMiddleware('admin'), async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const validation = jobUpdateSchema.safeParse(body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }

        const updatedJob = await prisma.jobs.update({
            where: { id: id },
            data: {
                CompanyName: body.CompanyName,
                role: body.role,
                package: body.package,
                jobdescription: body.jobdescription,
                Type: body.Type,
                eligibility: body.eligibility,
                departmant: body.departmant,
                applylink: body.applylink,
                deadline: body.deadline,
                companyvisit: body.companyvisit,
                status: body.status,
            }
        });
        return res.json(updatedJob);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});


router.delete('/deleteJob/:id',authMiddleware('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.jobs.delete({
            where: { id: id },
        });
        return res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
});
router.get('/jobs',authMiddleware('admin'), async (req, res) => {
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