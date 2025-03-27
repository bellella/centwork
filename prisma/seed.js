// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional)
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create fake users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice",
        password: "hashed-password", // use bcrypt in real use
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@example.com",
        name: "Bob",
        password: "hashed-password",
      },
    }),
  ]);

  // Create products for each user
  await prisma.product.createMany({
    data: [
      {
        title: "iPhone 14",
        description: "Brand new iPhone 14 for sale",
        price: 1200,
        image: "https://via.placeholder.com/300?text=iPhone14",
        userId: users[0].id,
      },
      {
        title: "MacBook Pro",
        description: "M2 chip, 2023 model",
        price: 2500,
        image: "https://via.placeholder.com/300?text=MacBook",
        userId: users[0].id,
      },
      {
        title: "Gaming Chair",
        description: "Comfortable chair for long gaming sessions",
        price: 200,
        image: "https://via.placeholder.com/300?text=Chair",
        userId: users[1].id,
      },
    ],
  });
  console.log("✅ Seed data inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
