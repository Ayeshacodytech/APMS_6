const express = require("express");
const router = express.Router();
const zod = require("zod");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { authMiddleware } = require("../middleware");
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
const teacherSignupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  department: zod.string(),
  name: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const validation = teacherSignupSchema.safeParse(body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Incorrect inputs",
        errors: validation.error.issues,
      });
    }

    const existingTeacher = await prisma.teacher.findFirst({
      where: { email: body.email },
    });
    if (existingTeacher) {
      return res.status(409).json({
        message: "Email is already taken",
      });
    }

    const hashedPassword = await hashPassword(body.password);
    const teacher = await prisma.teacher.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        department: body.department,
      },
    });
    const token = jwt.sign({ id: teacher.id, role: "teacher" }, JWT_SECRET);
    return res.json({ id: teacher.id, token });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});
const teacherSigninSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
router.post("/signin", async (req, res) => {
  try {
    const body = req.body;
    const validation = teacherSigninSchema.safeParse(body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Incorrect inputs",
        errors: validation.error.issues,
      });
    }

    const teacher = await prisma.teacher.findFirst({
      where: { email: body.email },
    });
    if (!teacher || !(await verifyPassword(body.password, teacher.password))) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ id: teacher.id, role: "teacher" }, JWT_SECRET);
    return res.json({ teacherId: teacher.id, token });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});
router.get("/aptitude/mcqs", authMiddleware("teacher"), async (req, res) => {
  try {
    const mcqs = await prisma.mcq.findMany();
    res.json(mcqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const mcqSchema = zod.object({
  question: zod.string().min(5, "Question must be at least 5 characters long"),
  options: zod.array(zod.string()).min(2, "At least two options are required"),
  answer: zod.string().min(1, "Answer is required"),
  explanation: zod
    .string()
    .min(5, "Explanation must be at least 5 characters long"),
});
router.post("/aptitude/mcqs", authMiddleware("teacher"), async (req, res) => {
  try {
    const teacherId = req.userId;
    const validatedData = mcqSchema.parse(req.body);
    const newMCQ = await prisma.mcq.create({
      data: {
        question: validatedData.question,
        options: validatedData.options,
        answer: validatedData.answer,
        explanation: validatedData.explanation,
        createdBy: teacherId,
      },
    });

    res.status(201).json(newMCQ);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});
router.delete(
  "/aptitude/mcqs/:id",
  authMiddleware("teacher"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const teacherId = req.userId;
      const mcq = await prisma.mcq.findUnique({
        where: { id, createdBy: teacherId },
      });

      if (!mcq) {
        return res
          .status(404)
          .json({
            message: "MCQ not found or you don't have permission to delete it",
          });
      }
      await prisma.mcq.delete({ where: { id } });
      res.json({ message: "MCQ deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
const resourceSchema = zod.object({
  topic: zod.string().min(3, "Topic must be at least 3 characters"),
  resource: zod.string().min(3, "resource must be at least 3 characters"),
  tags: zod.string().optional(),
});
router.get("/aptitude/mymcq", authMiddleware("teacher"), async (req, res) => {
  try {
    const teacherId = req.userId;

    const mcq = await prisma.mcq.findMany({
      where: { createdBy: teacherId },
    });

    if (mcq.length === 0) {
      return res.status(404).json({ message: "No MCQs created by you" });
    }

    res.json(mcq);
  } catch (error) {
    console.error("Error fetching mcq:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post(
  "/aptitude/resources",
  authMiddleware("teacher"),
  async (req, res) => {
    try {
      const validatedData = resourceSchema.parse(req.body);
      const teacherId = req.userId;
      const role = req.userRole;

      // Create a new resource
      const newResource = await prisma.resource.create({
        data: {
          topic: validatedData.topic,
          resource: validatedData.resource,
          tags: validatedData.tags,
          addedByTeacherId: teacherId,
          addedByType: role,
        },
      });

      res
        .status(201)
        .json({ message: "Resource added successfully", newResource });
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
  }
);

router.get(
  "/aptitude/resources",
  authMiddleware("teacher"),
  async (req, res) => {
    try {
      const resources = await prisma.resource.findMany({
        orderBy: { createdAt: "desc" },
      });

      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.get(
  "/aptitude/resources/:id",
  authMiddleware("teacher"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const resource = await prisma.resource.findUnique({
        where: { id },
      });

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.get(
  "/aptitude/myresources",
  authMiddleware("teacher"),
  async (req, res) => {
    try {
      const teacherId = req.userId;

      const resources = await prisma.resource.findMany({
        where: { addedByTeacherId: teacherId },
      });

      if (resources.length === 0) {
        return res
          .status(404)
          .json({ message: "No resources found for this teacher" });
      }

      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.delete(
  "/aptitude/resources/:id",
  authMiddleware("teacher"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const teacherId = req.userId; // Get authenticated teacher's ID

      // Check if the resource exists and belongs to the teacher
      const resource = await prisma.resource.findFirst({
        where: { id, addedByTeacherId: teacherId },
      });

      if (!resource) {
        return res
          .status(404)
          .json({
            message:
              "Resource not found or you don't have permission to delete it",
          });
      }

      // Delete the resource
      await prisma.resource.delete({
        where: { id },
      });

      res.json({ message: "Resource deleted successfully" });
    } catch (error) {
      console.error("Error deleting resource:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.get("/gate/mcqs", authMiddleware("teacher"), async (req, res) => {
  try {
    const mcqs = await prisma.mcq.findMany();
    res.json(mcqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/gate/mcqs", authMiddleware("teacher"), async (req, res) => {
  try {
    const teacherId = req.userId;
    const validatedData = mcqSchema.parse(req.body);
    const newMCQ = await prisma.gatemcq.create({
      data: {
        question: validatedData.question,
        options: validatedData.options,
        answer: validatedData.answer,
        explanation: validatedData.explanation,
        createdBy: teacherId,
      },
    });

    res.status(201).json(newMCQ);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});
router.delete("/gate/mcqs/:id", authMiddleware("teacher"), async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = req.userId;
    const mcq = await prisma.gatemcq.findUnique({
      where: { id, createdBy: teacherId },
    });

    if (!mcq) {
      return res
        .status(404)
        .json({
          message: "MCQ not found or you don't have permission to delete it",
        });
    }
    await prisma.gatemcq.delete({ where: { id } });
    res.json({ message: "MCQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/gate/mymcq", authMiddleware("teacher"), async (req, res) => {
  try {
    const teacherId = req.userId;

    const mcq = await prisma.gatemcq.findMany({
      where: { createdBy: teacherId },
    });

    if (mcq.length === 0) {
      return res.status(404).json({ message: "No MCQs created by you" });
    }

    res.json(mcq);
  } catch (error) {
    console.error("Error fetching mcq:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/gate/resources", authMiddleware("teacher"), async (req, res) => {
  try {
    const validatedData = resourceSchema.parse(req.body);
    const teacherId = req.userId;
    const role = req.userRole;

    // Create a new resource
    const newResource = await prisma.gateresource.create({
      data: {
        topic: validatedData.topic,
        resource: validatedData.resource,
        tags: validatedData.tags,
        addedByTeacherId: teacherId,
        addedByType: role,
      },
    });

    res
      .status(201)
      .json({ message: "Resource added successfully", newResource });
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

router.get("/gate/resources", authMiddleware("teacher"), async (req, res) => {
  try {
    const resources = await prisma.gateresource.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get(
  "/gate/resources/:id",
  authMiddleware("teacher"),
  async (req, res) => {
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
  }
);
router.get("/gate/myresources", authMiddleware("teacher"), async (req, res) => {
  try {
    const teacherId = req.userId;

    const resources = await prisma.gateresource.findMany({
      where: { addedByTeacherId: teacherId },
    });

    if (resources.length === 0) {
      return res
        .status(404)
        .json({ message: "No resources found for this teacher" });
    }

    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete(
  "/gate/resources/:id",
  authMiddleware("teacher"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const teacherId = req.userId; // Get authenticated teacher's ID

      // Check if the resource exists and belongs to the teacher
      const resource = await prisma.gateresource.findFirst({
        where: { id, addedByTeacherId: teacherId },
      });

      if (!resource) {
        return res
          .status(404)
          .json({
            message:
              "Resource not found or you don't have permission to delete it",
          });
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
  }
);
module.exports = router;
