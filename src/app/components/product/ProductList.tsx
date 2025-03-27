'use client';

import React, { useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import PageContainer from "../container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";

export default function ProductList({ products }: { products: Product[] }) {
  useEffect(() => {
    axios
      .get("/api/test")
      .then((res) => console.log(res))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <PageContainer title="Products" description="this is Products">
      <DashboardCard title="Products">
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} md={4} lg={3} key={index}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
}
