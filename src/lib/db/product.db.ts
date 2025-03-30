import prisma from "./prisma";
import {
  Product,
  Reservation,
  User,
  ProductCategory,
  ProductStatus,
  Location,
  Prisma,
} from "@prisma/client";
import {ProductWithUserAndReservations} from "@/types/extendProduct";

export function getProducts(queryObject: any) {
  const where: Prisma.ProductWhereInput = {};
  if (queryObject?.keyword) {
    where.OR = [
      { title: { contains: queryObject.keyword, mode: "insensitive" } },
      { description: { contains: queryObject.keyword, mode: "insensitive" } },
    ];
  }

  if (queryObject?.category) {
    where.category = queryObject.category;
  }

  if (queryObject?.location) {
    where.location = queryObject.location;
  }

  return prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export function getProductById(id: string): Promise<ProductWithUserAndReservations | null> {
  return prisma.product.findUnique({
    where: { id },
    include: {
      user: true,
      reservations: true
    },
  });
}


export function getProductByUserId(userId: string): Promise<Product[]> {
  return prisma.product.findMany({
    where: { userId },
    include: {
      user: true,
    },
  });
}

export function createProduct(data: Prisma.ProductCreateInput) {
  return prisma.product.create({ data });
}

export function updateProduct(
  id: string,
  data: {
    title: string;
    description: string;
    price: number;
    image?: string;
    status: ProductStatus;
    category: ProductCategory;
    location: Location;
    keywords: string[];
  }
) {
  return prisma.product.update({
    where: { id },
    data,
  });
}

export function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  });
}
