import prisma from "./prisma";
import { Product, Reservation, User } from "@prisma/client";

export function getProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function getProductById(id: string): Promise<
  | (Product & {
      user: User;
      reservations: Reservation[];
    })
  | null
> {
  return prisma.product.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}

export function getProductByUserId(userId: string): Promise<Product[]> {
  try {
    return prisma.product.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export function createProduct(data: {
  title: string;
  description: string;
  price: number;
  image?: string;
  userId: string;
}) {
  return prisma.product.create({ data });
}

export function updateProduct(
  id: string,
  data: {
    title: string;
    description: string;
    price: number;
    image?: string;
  }
) {
  return prisma.product.update({
    where: { id },
    data,
  });
}
