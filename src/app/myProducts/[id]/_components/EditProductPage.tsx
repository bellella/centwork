"use client";

import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Chip,
} from "@mui/material";
import { ProductCategory, ProductStatus } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({
  productDetails,
}: {
  productDetails: Product;
}) {
  const router = useRouter();
  const [keywordInput, setKeywordInput] = useState("");
  const [product, setProduct] = useState<Product>(productDetails);

  const handleSubmit = async () => {
    const res = await fetch(`/api/myProducts/edit`, {
      method: "PUT",
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product updated");
      router.push("/myProducts");
    } else {
      alert(data.error || "Failed to update product");
    }
  };

  const confirmDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/myProducts/edit`, {
      method: "DELETE",
      body: JSON.stringify({ id: product.id }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product deleted");
      router.push("/myProducts");
    } else {
      alert(data.error || "Failed to delete product");
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
        onChange={(e) =>
          setProduct({ ...product, price: parseInt(e.target.value) })
        }
        fullWidth
        margin="normal"
      />

      <TextField
        select
        label="Status"
        value={product?.status}
        onChange={(e) =>
          setProduct({ ...product, status: e.target.value as ProductStatus })
        }
        fullWidth
        margin="normal"
      >
        {Object.values(ProductStatus).map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Category"
        value={product?.category}
        onChange={(e) =>
          setProduct({
            ...product,
            category: e.target.value as ProductCategory,
          })
        }
        fullWidth
        margin="normal"
      >
        {Object.values(ProductCategory).map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Location"
        value={product?.location}
        onChange={(e) => setProduct({ ...product, location: e.target.value })}
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
      <TextField
        label="Keywords"
        value={keywordInput}
        onChange={(e) => setKeywordInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setProduct({
              ...product,
              keywords: [...product.keywords, keywordInput],
            });
            setKeywordInput("");
          }
        }}
        fullWidth
        margin="normal"
        placeholder="Press Enter to add keyword"
        sx={{ mt: 2, mb: 2 }}
      />
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="start"
        width="100%"
      >
        {product.keywords.map((keyword) => (
          <Chip
            key={keyword}
            label={keyword}
            onDelete={() =>
              setProduct({
                ...product,
                keywords: product.keywords.filter((k) => k !== keyword),
              })
            }
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="flex-end" width="100%" gap={4}>
        <Button
          variant="contained"
          onClick={confirmDelete}
          sx={{ mt: 2 }}
          color="error"
        >
          Delete
        </Button>
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
}

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  status: ProductStatus;
  location: string;
  keywords: string[];
};
