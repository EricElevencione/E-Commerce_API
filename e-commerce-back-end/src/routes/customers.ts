import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// GET /api/customers — list all customers with order count
router.get("/", async (_req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        _count: { select: { orders: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ data: customers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// GET /api/customers/:id — single customer with their orders
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        orders: {
          include: { items: { include: { product: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    res.json({ data: customer });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

// POST /api/customers — create a customer
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: "name and email are required" });
      return;
    }

    const customer = await prisma.customer.create({
      data: { name, email, phone, address },
    });

    res.status(201).json({ data: customer });
  } catch (err) {
    res.status(500).json({ error: "Failed to create customer — email may already exist" });
  }
});

// PUT /api/customers/:id — update a customer
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, phone, address } = req.body;

    const customer = await prisma.customer.update({
      where: { id },
      data: { name, email, phone, address },
    });

    res.json({ data: customer });
  } catch (err) {
    res.status(500).json({ error: "Failed to update customer" });
  }
});

export default router;
