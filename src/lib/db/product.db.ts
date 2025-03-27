import prisma from "./prisma";

export function getProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}
