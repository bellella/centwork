"use client";

import { TextField, Button, Box, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({
  productDetails,
}: {
  productDetails: Product;
}) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(productDetails);

  const handleSubmit = async () => {
    const res = await fetch(`/api/myProducts/edit`, {
      method: "PUT",
      body: JSON.stringify({
        id: product?.id,
        title: product?.title,
        description: product?.description,
        price: Number(product?.price),
        image: product?.image,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product updated");
      router.refresh();
    } else {
      alert(data.error || "Failed to update product");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={2}
      py={4}
    >
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>

      <TextField
        label="Title"
        value={product?.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={product?.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        value={product?.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image URL"
        value={product?.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleSubmit}>
        Update
      </Button>
    </Box>
  );
}
