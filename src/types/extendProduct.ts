import {ProductCategory, Location, Reservation, User, Product} from "@prisma/client";

export const ProductCategoryWithAll = [
  "ALL",
  ...Object.values(ProductCategory),
];

export type ProductWithUserAndReservations = Product & {
  user: User;
  reservations: Reservation[];
};

export const LocationWithAll = ["ALL", ...Object.values(Location)];

export type ProductQuery = {
  keyword: string;
  category: (typeof ProductCategoryWithAll)[number];
  location: (typeof LocationWithAll)[number];
};
