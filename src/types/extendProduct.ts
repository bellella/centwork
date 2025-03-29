import { ProductCategory, Location } from "@prisma/client";

export const ProductCategoryWithAll = [
  "ALL",
  ...Object.values(ProductCategory),
];

export const LocationWithAll = ["ALL", ...Object.values(Location)];

export type ProductQuery = {
  keyword: string;
  category: (typeof ProductCategoryWithAll)[number];
  location: (typeof LocationWithAll)[number];
};
