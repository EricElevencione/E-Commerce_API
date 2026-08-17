import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Cleaning database...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.customer.deleteMany();

  console.log("🌱 Seeding categories...");
  const sneakers = await prisma.category.create({
    data: { name: "Sneakers", slug: "sneakers" },
  });
  const running = await prisma.category.create({
    data: { name: "Running", slug: "running" },
  });
  const basketball = await prisma.category.create({
    data: { name: "Basketball", slug: "basketball" },
  });
  const training = await prisma.category.create({
    data: { name: "Training & Gym", slug: "training-gym" },
  });

  console.log("👟 Seeding products...");
  const productsData = [
    // --- Sneakers Category ---
    {
      name: "Nike Air Force 1 '07",
      description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
      price: 115.00,
      stock: 45,
      imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80",
      categoryId: sneakers.id,
    },
    {
      name: "Nike Dunk Low Retro",
      description: "Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colors. This basketball icon channels '80s vibes with premium leather in the upper.",
      price: 115.00,
      stock: 20,
      imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
      categoryId: sneakers.id,
    },
    {
      name: "Air Jordan 1 Retro High OG",
      description: "Familiar but always fresh, the iconic Air Jordan 1 is remastered for today's sneakerhead culture. This Retro High OG edition features premium leather, comfortable cushioning and classic design details.",
      price: 180.00,
      stock: 15,
      imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
      categoryId: sneakers.id,
    },
    
    // --- Running Category ---
    {
      name: "Nike Air Zoom Pegasus 40",
      description: "A springy ride for every run, the Peg's familiar, just-for-you feel returns to help you accomplish your goals. This version has the same responsiveness and neutral support you love, but with improved comfort in those sensitive areas.",
      price: 130.00,
      stock: 60,
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      categoryId: running.id,
    },
    {
      name: "Nike Invincible 3",
      description: "With maximum cushioning to support every mile, the Invincible 3 gives you our highest level of comfort underfoot. Its springy ZoomX foam keeps you stable and fresh, helping you stay on your feet today, tomorrow and beyond.",
      price: 180.00,
      stock: 35,
      imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80",
      categoryId: running.id,
    },

    // --- Basketball Category ---
    {
      name: "LeBron XXI 'Conchshell'",
      description: "The LeBron XXI features a cabling system that works with Zoom Air cushioning and a light, low-to-the-ground design, giving you agile fluidity and explosiveness without excess weight.",
      price: 200.00,
      stock: 12,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      categoryId: basketball.id,
    },
    {
      name: "KD16 'Aunt Pearl'",
      description: "Kevin Durant's KD16 uses a low-profile design that is light and responsive. It features a forefoot Zoom Air unit for extra pop when the game speeds up, and full-length cushioning to keep you fresh.",
      price: 160.00,
      stock: 8,
      imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80",
      categoryId: basketball.id,
    },

    // --- Training Category ---
    {
      name: "Nike Metcon 9",
      description: "Whatever your 'why' is for working out, the Metcon 9 makes it all worth it. We improved on the 8 with a larger Hyperlift plate and added rubber rope wrap. Sworn to by some of the greatest athletes in the world.",
      price: 150.00,
      stock: 25,
      imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
      categoryId: training.id,
    },
    {
      name: "Nike Free Metcon 5",
      description: "The Nike Free Metcon 5 combines flexibility with stability to help you get the most out of your training program. Updated 'Free' forefoot flexibility offers agility for quick movements & sprints.",
      price: 120.00,
      stock: 40,
      imageUrl: "https://images.unsplash.com/photo-1575537300062-5cfde37b6a4f?auto=format&fit=crop&w=600&q=80",
      categoryId: training.id,
    }
  ];

  const createdProducts = [];
  for (const item of productsData) {
    const product = await prisma.product.create({
      data: item,
    });
    createdProducts.push(product);
  }

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

  console.log("📦 Seeding orders and sales analytics...");
  // Order 1: Completed order for Marcus Aurelius (Air Force 1 + Pegasus)
  await prisma.order.create({
    data: {
      customerId: customer1.id,
      status: "DELIVERED",
      total: 245.00, // 115 + 130
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      items: {
        create: [
          {
            productId: createdProducts[0].id, // Air Force 1
            quantity: 1,
            unitPrice: 115.00,
          },
          {
            productId: createdProducts[3].id, // Pegasus 40
            quantity: 1,
            unitPrice: 130.00,
          }
        ]
      }
    }
  });

  // Order 2: Processing order for Serena Williams (Metcon 9 + Dunk Low)
  await prisma.order.create({
    data: {
      customerId: customer2.id,
      status: "PROCESSING",
      total: 380.00, // 150 + 2*115
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      items: {
        create: [
          {
            productId: createdProducts[7].id, // Metcon 9
            quantity: 1,
            unitPrice: 150.00,
          },
          {
            productId: createdProducts[1].id, // Dunk Low
            quantity: 2,
            unitPrice: 115.00,
          }
        ]
      }
    }
  });

  // Order 3: Pending order for Tony Stark (LeBron XXI + AJ1)
  await prisma.order.create({
    data: {
      customerId: customer3.id,
      status: "PENDING",
      total: 380.00, // 200 + 180
      createdAt: new Date(), // Today
      items: {
        create: [
          {
            productId: createdProducts[5].id, // LeBron XXI
            quantity: 1,
            unitPrice: 200.00,
          },
          {
            productId: createdProducts[2].id, // AJ1
            quantity: 1,
            unitPrice: 180.00,
          }
        ]
      }
    }
  });

  console.log("🎉 Seeding complete successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
