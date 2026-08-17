import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// GET /api/analytics/summary
// Returns: total revenue, order count by status, total customers, total products,
//          top 5 selling products, and revenue for the last 7 days
router.get("/summary", async (_req: Request, res: Response) => {
  try {
    const [
      totalRevenueResult,
      ordersByStatus,
      totalCustomers,
      totalProducts,
      topProducts,
      recentOrders,
    ] = await Promise.all([
      // Total revenue from delivered orders
      prisma.order.aggregate({
        where: { status: "DELIVERED" },
        _sum: { total: true },
      }),

      // Order counts grouped by status
      prisma.order.groupBy({
        by: ["status"],
        _count: { id: true },
      }),

      // Total customer count
      prisma.customer.count(),

      // Total product count
      prisma.product.count(),

      // Top 5 best-selling products by units sold
      prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),

      // Last 7 days of orders for revenue trend
      prisma.order.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
        select: { createdAt: true, total: true, status: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    // Resolve product names for top products
    const topProductIds = topProducts.map((p) => p.productId);
    const topProductDetails = await prisma.product.findMany({
      where: { id: { in: topProductIds } },
      select: { id: true, name: true, imageUrl: true },
    });

    const topProductsWithNames = topProducts.map((p) => ({
      ...p,
      product: topProductDetails.find((d) => d.id === p.productId),
    }));

    res.json({
      data: {
        totalRevenue: totalRevenueResult._sum.total ?? 0,
        ordersByStatus: Object.fromEntries(
          ordersByStatus.map((g) => [g.status, g._count.id])
        ),
        totalCustomers,
        totalProducts,
        topProducts: topProductsWithNames,
        recentOrders,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch analytics summary" });
  }
});

export default router;
