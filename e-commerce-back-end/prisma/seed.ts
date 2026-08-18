import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: string;
}

interface DummyJSONResponse {
  products: DummyProduct[];
}

async function fetchFromDummyJSON(category: string): Promise<DummyProduct[]> {
  const url = `https://dummyjson.com/products/category/${category}`;
  console.log(`📡 Fetching ${category} from DummyJSON API...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
  }
  const data = (await response.json()) as DummyJSONResponse;
  return data.products;
}

async function main() {
  console.log("🧹 Cleaning database...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.customer.deleteMany();

  console.log("🌱 Seeding categories...");
  const mensCategory = await prisma.category.create({
    data: { name: "Men's Shoes", slug: "mens-shoes" },
  });
  const womensCategory = await prisma.category.create({
    data: { name: "Women's Shoes", slug: "womens-shoes" },
  });

  // Fetch products from DummyJSON
  const rawMensShoes = await fetchFromDummyJSON("mens-shoes");
  const rawWomensShoes = await fetchFromDummyJSON("womens-shoes");

  console.log("👟 Saving products to database...");
  const createdProducts = [];

  // Seed Men's Shoes
  for (const item of rawMensShoes) {
    const product = await prisma.product.create({
      data: {
        name: item.title,
        description: item.description,
        price: item.price,
        stock: item.stock,
        imageUrl: item.thumbnail,
        categoryId: mensCategory.id,
      },
    });
    createdProducts.push(product);
  }

  // Seed Women's Shoes
  for (const item of rawWomensShoes) {
    const product = await prisma.product.create({
      data: {
        name: item.title,
        description: item.description,
        price: item.price,
        stock: item.stock,
        imageUrl: item.thumbnail,
        categoryId: womensCategory.id,
      },
    });
    createdProducts.push(product);
  }

  console.log(`📦 Seeded ${createdProducts.length} products successfully!`);

  console.log("👤 Seeding customers...");
  const customer1 = await prisma.customer.create({
    data: {
      name: "Marcus Aurelius",
      email: "marcus@stoic.com",
      phone: "+1555019283",
      address: "1 Imperial Way, Rome, IT 00100",
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: "Serena Williams",
      email: "serena@tennis.com",
      phone: "+1555098234",
      address: "77 Court Drive, Palm Beach, FL 33480",
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      name: "Tony Stark",
      email: "tony@starkindustries.com",
      phone: "+15553000",
      address: "10880 Malibu Point, Malibu, CA 90265",
    },
  });

  console.log("📊 Seeding orders for sales analytics...");
  
  if (createdProducts.length >= 4) {
    // Order 1: Delivered order for Marcus Aurelius (using first two products)
    const price1 = Number(createdProducts[0].price);
    const price2 = Number(createdProducts[1].price);
    await prisma.order.create({
      data: {
        customerId: customer1.id,
        status: "DELIVERED",
        total: price1 + price2,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        items: {
          create: [
            {
              productId: createdProducts[0].id,
              quantity: 1,
              unitPrice: price1,
            },
            {
              productId: createdProducts[1].id,
              quantity: 1,
              unitPrice: price2,
            }
          ]
        }
      }
    });

    // Order 2: Processing order for Serena Williams
    const price3 = Number(createdProducts[2].price);
    await prisma.order.create({
      data: {
        customerId: customer2.id,
        status: "PROCESSING",
        total: price3 * 2,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        items: {
          create: [
            {
              productId: createdProducts[2].id,
              quantity: 2,
              unitPrice: price3,
            }
          ]
        }
      }
    });

    // Order 3: Pending order for Tony Stark
    const price4 = Number(createdProducts[3].price);
    await prisma.order.create({
      data: {
        customerId: customer3.id,
        status: "PENDING",
        total: price4,
        createdAt: new Date(), // Today
        items: {
          create: [
            {
              productId: createdProducts[3].id,
              quantity: 1,
              unitPrice: price4,
            }
          ]
        }
      }
    });
  }

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
