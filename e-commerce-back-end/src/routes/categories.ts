import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// GET /api/categories — list all categories with product count
router.get("/", async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: "asc" },
    });

    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET /api/categories/:slug — single category with products
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { products: true },
    });

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json({ data: category });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

// POST /api/categories — create a category
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      res.status(400).json({ error: "name and slug are required" });
      return;
    }

    const category = await prisma.category.create({ data: { name, slug } });
    res.status(201).json({ data: category });
  } catch (err) {
    res.status(500).json({ error: "Failed to create category" });
  }
});

export default router;
