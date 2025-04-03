const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { authMiddleware } = require("../middleware");

const router = express.Router();

// GET /api/problems - Retrieve all problems with user's best status
router.get("/", authMiddleware("student"), async (req, res) => {
    try {
        const { tag } = req.query;
        const userId = req.userId; // Provided by authMiddleware

        // Fetch problems based on tag filter (if provided)
        let problems;
        if (tag) {
            problems = await prisma.problem.findMany({
                where: {
                    tags: {
                        contains: tag, // Assumes tags is a comma-separated string, e.g., "array,graph"
                    },
                },
            });
        } else {
            problems = await prisma.problem.findMany();
        }

        if (!userId) {
            // If no user is logged in (unlikely with authMiddleware, but as a safeguard)
            return res.status(200).json(problems);
        }

        // Fetch all submissions for this user related to the retrieved problems
        const problemIds = problems.map((problem) => problem.id);
        const submissions = await prisma.submission.findMany({
            where: {
                userId,
                problemId: {
                    in: problemIds,
                },
            },
            select: {
                problemId: true,
                status: true,
            },
        });

        // Map submissions to determine the best status for each problem
        const statusMap = new Map();
        submissions.forEach((submission) => {
            const currentBest = statusMap.get(submission.problemId);
            const newStatus = submission.status;

            // Define priority: "Accepted" > "Wrong Answer" > "ERROR"
            if (!currentBest || newStatus === "Accepted" ||
                (currentBest === "ERROR" && newStatus === "Wrong Answer")) {
                statusMap.set(submission.problemId, newStatus);
            }
        });

        // Attach the best status to each problem
        const problemsWithStatus = problems.map((problem) => ({
            ...problem,
            userBestStatus: statusMap.get(problem.id) || "Not Attempted", // Default if no submission
        }));

        return res.status(200).json(problemsWithStatus);
    } catch (err) {
        console.error("Error fetching problems:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// GET /api/problems/:id - Retrieve a specific problem by ID (unchanged)
router.get("/:id", authMiddleware("student"), async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await prisma.problem.findUnique({ where: { id: id } });
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.json(problem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

router.post('/', authMiddleware('admin'), async (req, res) => {
    try {
        const { title, description, difficulty, tags, testCases } = req.body;

        // Validate required fields
        if (!title || !description || !difficulty || !tags || !testCases) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Convert tags to a comma-separated string
        const tagsString = tags.join(',');

        // Create a new problem
        const problem = await prisma.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags: tagsString,
                testCases: JSON.stringify(testCases),
            },
        });

        return res.status(201).json(problem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
