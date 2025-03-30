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
  imageName?: string;
  userId: string;
  category: ProductCategory;
  location: Location;
  keywords: string[];
  status: ProductStatus;
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
