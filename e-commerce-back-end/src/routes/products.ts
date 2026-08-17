import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// GET /api/products — list all, optional ?category=slug&search=term
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query as Record<string, string>;

    const products = await prisma.product.findMany({
      where: {
        ...(category && {
          category: { slug: category },
        }),
        ...(search && {
          name: { contains: search, mode: "insensitive" },
        }),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/:id — single product
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({ data: product });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// POST /api/products — create a product
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, imageUrl, categoryId } = req.body;

    if (!name || price === undefined || !categoryId) {
      res.status(400).json({ error: "name, price, and categoryId are required" });
      return;
    }

    const product = await prisma.product.create({
      data: { name, description, price, stock, imageUrl, categoryId },
      include: { category: true },
    });

    res.status(201).json({ data: product });
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// PUT /api/products/:id — update a product
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, stock, imageUrl, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: { name, description, price, stock, imageUrl, categoryId },
      include: { category: true },
    });

    res.json({ data: product });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE /api/products/:id — delete a product
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.product.delete({ where: { id } });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
