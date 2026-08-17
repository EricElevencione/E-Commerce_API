import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { OrderStatus } from "../../generated/prisma/client.js";

const router = Router();

// GET /api/orders — list all orders with customer + items
router.get("/", async (req: Request, res: Response) => {
  try {
    const { status } = req.query as Record<string, string>;

    const orders = await prisma.order.findMany({
      where: {
        ...(status && { status: status as OrderStatus }),
      },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ data: orders });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// GET /api/orders/:id — single order detail
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json({ data: order });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// POST /api/orders — create an order with items
// Body: { customerId, items: [{ productId, quantity }] }
router.post("/", async (req: Request, res: Response) => {
  try {
    const { customerId, items } = req.body as {
      customerId: number;
      items: { productId: number; quantity: number }[];
    };

    if (!customerId || !items?.length) {
      res.status(400).json({ error: "customerId and items[] are required" });
      return;
    }

    // Fetch product prices to calculate total and build order items
    const products = await prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
    });

    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
      };
    });

    const total = orderItems.reduce(
      (sum, item) => sum + Number(item.unitPrice) * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        customerId,
        total,
        items: { create: orderItems },
      },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });

    res.status(201).json({ data: order });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create order";
    res.status(500).json({ error: message });
  }
});

// PATCH /api/orders/:id/status — update order status
router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body as { status: OrderStatus };

    const validStatuses: OrderStatus[] = [
      "PENDING",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: `status must be one of: ${validStatuses.join(", ")}` });
      return;
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { customer: true, items: { include: { product: true } } },
    });

    res.json({ data: order });
  } catch (err) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});

export default router;
