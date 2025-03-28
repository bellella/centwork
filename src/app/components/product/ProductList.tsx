"use client";

import React from "react";
import { Grid } from "@mui/material";
import PageContainer from "../container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";

export default function ProductList({
  products,
  isMyProducts = false,
}: {
  products: Product[];
  isMyProducts: boolean;
}) {
  return (
    <PageContainer title="Products" description="this is Products">
      <DashboardCard title={isMyProducts ? "My Products" : "Products"}>
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} md={4} lg={3} key={index}>
              <ProductCard product={product} isMyProducts={isMyProducts} />
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
}
