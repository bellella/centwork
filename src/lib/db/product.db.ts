import prisma from "./prisma";
import {Product, Reservation, User } from "@prisma/client";

export function getProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function getProductById(id: string): Promise<(Product & {
  user: User;
  reservations: Reservation[];
}) | null> {
  return prisma.product.findUnique({
    where: { id },
    include: {
      user: true,
      reservations: true,
    },
  });
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