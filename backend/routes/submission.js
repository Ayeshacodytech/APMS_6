const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { submitCodeToJudge0, fetchJudge0Results } = require("../utils/judge0");
const { authMiddleware } = require("../middleware");

const router = express.Router();
const DIFFICULTY_POINTS = {
  EASY: 10,
  MEDIUM: 20,
  HARD: 30,
};
// POST: Submit Code for Execution
router.post("/", authMiddleware("student"), async (req, res) => {
  const userId = req.userId;
  const { problemId, sourceCode, languageId } = req.body;

  // Validate required fields
  if (!problemId || !sourceCode || !languageId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Fetch the problem from the database
    const problem = await prisma.problem.findUnique({
      where: { id: problemId }, // Ensure problemId is a number if your schema expects it
    });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    // Parse test cases
    let testCases;
    try {
      testCases = JSON.parse(problem.testCases);
      if (!Array.isArray(testCases)) {
        throw new Error("Test cases must be an array.");
      }
    } catch (error) {
      console.error("Error parsing test cases:", error);
      return res.status(500).json({ message: "Invalid test cases format." });
    }

    // Submit code to Judge0 and get tokens
    const tokens = await submitCodeToJudge0(sourceCode, languageId, testCases);
    console.log("Received Tokens:", tokens);

    // Fetch results for all tokens at once
    const judgeResults = await fetchJudge0Results(tokens);
    console.log("Judge0 Execution Results:", JSON.stringify(judgeResults, null, 2));

    // Evaluate test cases
    const evaluatedTestCases = testCases.map((testCase, index) => {
      const result = judgeResults[index] || {};
      const actualOutput = result.stdout ? result.stdout.trim() : null;
      const expectedOutput = testCase.expectedOutput.trim();
      const passed = actualOutput === expectedOutput && result.status?.id === 3; // Status 3 = Accepted

      return {
        input: testCase.input,
        expectedOutput,
        actualOutput,
        passed,
        error: result.error || (result.stderr ? result.stderr.trim() : null),
      };
    });

    // Determine overall status
    const allTestsPassed = evaluatedTestCases.every(tc => tc.passed);
    const status = allTestsPassed ? "Accepted" : "Wrong Answer";

    // Create submission record
    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        sourceCode,
        languageId, // Store as number if schema expects it
        status,
        results: JSON.stringify({
          judgeResults,
          evaluatedTestCases,
        }),
      },
    });
    if (status === "Accepted") {
      const existingAccepted = await prisma.submission.findFirst({
        where: {
          userId,
          problemId,
          status: "Accepted",
          id: { not: submission.id }, // Exclude the current submission
        },
      });

      if (!existingAccepted) {
        // This is the first "Accepted" submission for this problem
        const pointsToAdd = DIFFICULTY_POINTS[problem.difficulty] || 0;
        await prisma.student.update({
          where: { id: userId },
          data: {
            points: {
              increment: pointsToAdd,
            },
          },
        });
      }
    }
    return res.status(200).json({
      submission,
      evaluatedTestCases,
      status,
    });
  } catch (error) {
    console.error("Error during submission:", error);
    // Store failed submission with error details
    const failedSubmission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        sourceCode,
        languageId,
        status: "ERROR",
        results: JSON.stringify({ error: error.message }),
      },
    });
    return res.status(500).json({
      message: "An error occurred while processing your submission.",
      submission: failedSubmission,
    });
  }
});

router.get("/", authMiddleware("student"), async (req, res) => {
  const userId = req.userId;

  try {
    const submissions = await prisma.submission.findMany({
      where: {
        userId,
      },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            difficulty: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// New POST /run endpoint
router.post("/run", authMiddleware("student"), async (req, res) => {
  const { problemId, sourceCode, languageId } = req.body;

  // Validate required fields
  if (!problemId || !sourceCode || !languageId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Fetch the problem from the database
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    // Parse test cases
    let testCases;
    try {
      testCases = JSON.parse(problem.testCases);
      if (!Array.isArray(testCases)) {
        throw new Error("Test cases must be an array.");
      }
    } catch (error) {
      console.error("Error parsing test cases:", error);
      return res.status(500).json({ message: "Invalid test cases format." });
    }

    // Submit code to Judge0 and get tokens
    const tokens = await submitCodeToJudge0(sourceCode, languageId, testCases);
    console.log("Run Tokens:", tokens);

    // Fetch results for all tokens
    const judgeResults = await fetchJudge0Results(tokens);
    console.log("Run Judge0 Results:", JSON.stringify(judgeResults, null, 2));

    // Evaluate test cases
    const evaluatedTestCases = testCases.map((testCase, index) => {
      const result = judgeResults[index] || {};
      const actualOutput = result.stdout ? result.stdout.trim() : null;
      const expectedOutput = testCase.expectedOutput.trim();
      const passed = actualOutput === expectedOutput && result.status?.id === 3;

      return {
        input: testCase.input,
        expectedOutput,
        actualOutput,
        passed,
        error: result.error || (result.stderr ? result.stderr.trim() : null),
      };
    });

    // Determine overall status (for informational purposes, not stored)
    const allTestsPassed = evaluatedTestCases.every(tc => tc.passed);
    const status = allTestsPassed ? "Accepted" : "Wrong Answer";

    // Return results without saving to database
    return res.status(200).json({
      evaluatedTestCases,
      status,
    });
  } catch (error) {
    console.error("Error during run:", error);
    return res.status(500).json({
      message: "An error occurred while running your code.",
      error: error.message,
    });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    // Fetch all students with their points
    const leaderboard = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        points: true,
      },
      where: {
        points: {
          gt: 0, // Only include users with points
        },
      },
      orderBy: {
        points: "desc", // Sort by points descending
      },
    });

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id", authMiddleware("student"), async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            description: true,
            testCases: true,
          },
        },
      },
    });

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Restrict access to the user's own submissions
    if (submission.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized: You can only view your own submissions" });
    }

    return res.status(200).json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;